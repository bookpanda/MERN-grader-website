const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	const token = user.createJWT();
	res.status(200).json({ user: { name: user.name }, token });
};
const login = (req, res) => {
	const { email, password } = req.body;
	throw new BadRequestError("d", 404);
	res.status(200).json(req.body);
};

module.exports = { register, login };
