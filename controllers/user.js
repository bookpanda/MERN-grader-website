const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const test = (req, res) => {
	res.status(200).json("test");
};

module.exports = { test };
