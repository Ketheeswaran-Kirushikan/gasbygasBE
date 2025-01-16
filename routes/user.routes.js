const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.middle");
const userController = require("../controllers/user.controller");

// Create User (Consumer or Business)
router.post(
  "/create",
  multer.single("image"), // Handles image upload
  userController.createUser
);

// Update User by ID (Consumer or Business)
router.put(
  "/update/:id",
  multer.single("image"), // Handles image upload
  userController.updateUser
);

// Delete User by ID (Consumer or Business)
router.delete("/delete/:id", userController.deleteUser);

// Get User by ID (Consumer or Business)
router.get("/get/:id", userController.getUserById);

// Route to get all users
router.get("/getall", userController.getAllUsers);


module.exports = router;
