const { default: mongoose } = require("mongoose");
const User = require("../model/userModel");

async function getUser(req, res) {
  try {
    const user = await User.find();

    res.status(200).json({
      data: user,
      message: "user found",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      success: false,
    });
  }
}

async function createUser(req, res) {
  try {
    const newUser = req.body;

    const createdUser = await User.create(newUser);

    res.status(201).json({
      data: createdUser,
      message: "user created successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;

    const userById = await User.findById(id);

    if (!userById) {
      return res.status(501).json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      data: userById,
      message: "user found successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "User not found.",
      error: true,
      success: false,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const delId = req.params.id;

    await User.findOneAndDelete(delId);

    const deletedUser = await User.findById(delId);

    if (!deletedUser) {
      res.status(200).json({
        message: "User deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "User not deleted",
    });
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getUser,
  createUser,
  getUserById,
  deleteUser,
  getCurrentUser,
};
