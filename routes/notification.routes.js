const express = require("express");
const {
  handleGetNotificationById,
  handleGetNotificationsByUserId,
  handleDeleteNotificationById,
  handleUpdateNotificationById,
} = require("../controllers/notification.controller");

const router = express.Router();

// Get Notification by ID
router.get("/:id", handleGetNotificationById);

// Get Notifications by User ID
router.get("/getall/:userId", handleGetNotificationsByUserId);

// Delete Notification by ID
router.delete("/:id", handleDeleteNotificationById);

// Update Notification by ID
router.put("/:id", handleUpdateNotificationById);

module.exports = router;
