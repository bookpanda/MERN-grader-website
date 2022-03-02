const User = require("../models/User");

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	res.status(200).json(req.body);
};
const login = (req, res) => {
	res.status(200).json(req.body);
};

module.exports = { register, login };
