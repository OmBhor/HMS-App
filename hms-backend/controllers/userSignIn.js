const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignIn(req, res) {
  try {
    const {email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        error: true,
        success: false,
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "password is required",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({email});

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        error: true,
        success: false,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Password does not match",
        error: true,
        success: false,
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      token: token,
      error: false,
      success: true,
      message: "Login successfully",
    });


  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignIn;