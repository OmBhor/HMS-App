const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/userSignUp");
const signInController = require("../controllers/userSignIn")

router.post("/signup", signUpController);
router.post("/signIn", signInController)


module.exports = router;