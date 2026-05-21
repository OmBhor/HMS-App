const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");

async function UserSignUP(req, res) {
  try {
    const { name, email, password, isAdmin } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required", error: true });
    }

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", error: true });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "Please enter password", error: true });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", error: true });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userDetails = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: {
        id: userDetails._id,
        name: userDetails.name,
        email: userDetails.email,
        isAdmin: userDetails.isAdmin
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: true,
    });
  }
}

module.exports = UserSignUP;
