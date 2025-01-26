const Notification = require("../models/notification.model");

// Get Notification by ID
const getNotificationById = async (id) => {
  return await Notification.findById(id);
};

// Get Notifications by User ID (User, Outlet, Dispatch)
const getNotificationsByUserId = async (userId) => {
  return await Notification.find({
    $or: [{ userId }, { outletId: userId }, { dispatchId: userId }],
  }).sort({ createdAt: -1 });
};

// Delete Notification by ID
const deleteNotificationById = async (id) => {
  return await Notification.findByIdAndDelete(id);
};

// Update Notification by ID (e.g., mark as read)
const updateNotificationById = async (id, updateData) => {
  return await Notification.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  getNotificationById,
  getNotificationsByUserId,
  deleteNotificationById,
  updateNotificationById,
};
