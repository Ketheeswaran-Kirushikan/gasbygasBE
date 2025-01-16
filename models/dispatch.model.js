const mongoose = require("mongoose");

const DispatchSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true, // Name of the admin responsible for dispatching
      trim: true,
    },
    password: {
      type: String,
      required: true, // Password for dispatch admin authentication
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Dispatch", DispatchSchema);
