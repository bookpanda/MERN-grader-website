const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
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

module.exports = { register, login, logout };
