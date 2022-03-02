const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide username"],
		maxlength: 25,
		minlength: 3,
	},
	email: {
		type: String,
		required: [true, "Please provide email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide password"],
		maxlength: 25,
		minlength: 6,
	},
});

module.exports = mongoose.model("User", UserSchema);
