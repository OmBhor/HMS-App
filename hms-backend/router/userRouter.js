const express = require ("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const userController = require("../controllers/userController.js");

console.log("UserRouter loaded");

router.get("/", userController.getUser);
router.post("/create", userController.createUser);
router.get("/me", authMiddleware, userController.getCurrentUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);


module.exports = router;

