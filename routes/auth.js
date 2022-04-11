const express = require("express");
const router = express.Router();
const {
	register,
	login,
	logout,
	googleLogin,
	githubLogin,
	githubCookie,
} = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/googlelogin", googleLogin);
router.get("/auth/github/callback", githubLogin);
router.get("/auth/github/cookie", githubCookie);

module.exports = router;
