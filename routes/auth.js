const express = require("express");
const router = express.Router();
const {
	register,
	login,
	logout,
	googleLogin,
	githubLogin,
} = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/googlelogin", googleLogin);
router.get("/auth/github/callback", githubLogin);

module.exports = router;
