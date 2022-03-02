const User = require("../models/User");

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	const token = user.createJWT();
	res.status(200).json({ user: { name: user.name }, token });
};
const login = (req, res) => {
	res.status(200).json(req.body);
};

module.exports = { register, login };
