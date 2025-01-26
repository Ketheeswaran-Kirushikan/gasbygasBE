const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    dispatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dispatch", // Reference to the Dispatch model
    },
    outletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet", // Reference to the Outlet model
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    message: {
      type: String,
      required: true, // Notification message
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false, // Whether the notification is read or not
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
