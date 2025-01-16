const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Login Route
router.post("/login", authController.loginUser);

// Logout Route
router.post("/logout", authController.logoutUser);

module.exports = router;
