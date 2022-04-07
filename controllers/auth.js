const User = require("../models/User");
const axios = require("axios");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const { OAuth2Client } = require("google-auth-library");

const register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadRequestError("Please provide all values");
	}
	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) {
		throw new BadRequestError("Email already in use");
	}
	const user = await User.create({ name, email, password });
	const accessToken = user.createAccessToken();
	const refreshToken = user.createRefreshToken();
	res
		.status(200)
		.json({ user: { name: user.name }, accessToken, refreshToken });
};
const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("Invalid Credentials");
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid Credentials");
	}
	const accessToken = user.createAccessToken();
	const refreshToken = user.createRefreshToken();
	res
		.status(202)
		.cookie("refreshToken", refreshToken, {
			sameSite: "strict",
			path: "/",
			expires: new Date(new Date().getTime() + 100 * 1000),
			httpOnly: true,
		})
		.json({ user: { name: user.name }, accessToken, refreshToken });
};

const logout = async (req, res) => {
	res.status(202).clearCookie("refreshToken").send("cookies cleared");
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
const googleLogin = async (req, res) => {
	const { idToken } = req.body;

	const response = await client.verifyIdToken({
		idToken,
		audience: process.env.GOOGLE_CLIENT,
	});
	const { email_verified, name, email, picture: image } = response.payload;
	if (email_verified) {
		const findUser = await User.findOne({ email });
		if (findUser) {
			const updatedUser = await User.findOneAndUpdate(
				{ email },
				{ image },
				{
					new: true,
					runValidators: true,
				}
			);
			const accessToken = updatedUser.createAccessToken();
			const refreshToken = updatedUser.createRefreshToken();
			return res.json({
				user: { name: updatedUser.name, image: updatedUser.image },
				accessToken,
				refreshToken,
			});
		} else {
			let password = email + process.env.JWT_SECRET;
			const user = await User.create({ name, email, password, image });
			const accessToken = user.createAccessToken();
			const refreshToken = user.createRefreshToken();
			res.status(200).json({
				user: { name: user.name, image: user.image },
				accessToken,
				refreshToken,
			});
		}
	} else {
		return res.status(400).json({
			error: "Google login failed. Please try again",
		});
	}
};

const githubLogin = async (req, res, next) => {
	const { code } = req.query;

	if (!code) {
		return res.json({ success: false, message: "Error: no code" });
	}
	const response = await axios.post(
		"https://github.com/login/oauth/access_token",
		{
			client_id: process.env.GITHUB_CLIENT_ID,
			client_secret: process.env.GITHUB_CLIENT_SECRET,
			code: code,
		},
		{
			headers: {
				Accept: "application/json",
			},
		}
	);
	const accessToken = response.data.access_token;
	const { data: userData } = await axios.get("https://api.github.com/user", {
		headers: {
			Authorization: `token ${accessToken}`,
		},
	});
	const { data: emailData } = await axios.get(
		"https://api.github.com/user/emails",
		{
			headers: {
				Authorization: `token ${accessToken}`,
			},
		}
	);

	const { name, avatar_url: image } = userData;
	const { verified: email_verified, email } = emailData[0];
	if (email_verified) {
		const findUser = await User.findOne({ email });
		if (findUser) {
			const updatedUser = await User.findOneAndUpdate(
				{ email },
				{ image },
				{
					new: true,
					runValidators: true,
				}
			);
			const accessToken = updatedUser.createAccessToken();
			const refreshToken = updatedUser.createRefreshToken();
			const user = { name: updatedUser.name, image: updatedUser.image };
			return res.json({
				user: { name: updatedUser.name, image: updatedUser.image },
				accessToken,
				refreshToken,
			});
		} else {
			let password = email + process.env.JWT_SECRET;
			const user = await User.create({ name, email, password, image });
			const accessToken = user.createAccessToken();
			const refreshToken = user.createRefreshToken();
			res.status(200).json({
				user: { name: user.name, image: user.image },
				accessToken,
				refreshToken,
			});
		}
	} else {
		return res.status(400).json({
			error: "GitHub login failed. Please try again",
		});
	}

	// res.redirect("http://localhost:3000/login");
};

module.exports = {
	register,
	login,
	logout,
	googleLogin,
	githubLogin,
};
