const {
    getNotificationById,
    getNotificationsByUserId,
    deleteNotificationById,
    updateNotificationById,
  } = require("../services/notification.service");
  
  // Get Notification by ID
  const handleGetNotificationById = async (req, res) => {
    try {
      const notification = await getNotificationById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get Notifications by User ID
  const handleGetNotificationsByUserId = async (req, res) => {
    try {
      const notifications = await getNotificationsByUserId(req.params.userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete Notification by ID
  const handleDeleteNotificationById = async (req, res) => {
    try {
      const notification = await deleteNotificationById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update Notification by ID
  const handleUpdateNotificationById = async (req, res) => {
    try {
      const updatedNotification = await updateNotificationById(
        req.params.id,
        req.body
      );
      console.log(updatedNotification);
      if (!updatedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.status(200).json(updatedNotification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    handleGetNotificationById,
    handleGetNotificationsByUserId,
    handleDeleteNotificationById,
    handleUpdateNotificationById,
  };
  