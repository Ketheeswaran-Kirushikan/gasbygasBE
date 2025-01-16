const mongoose = require("mongoose");

const OutletSchema = new mongoose.Schema(
  {
    outletName: {
      type: String,
      required: true, // Name of the outlet
      trim: true,
    },
    outletAddress: {
      type: String,
      required: true, // Address of the outlet
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: true, // Unique registration number of the outlet
      unique: true,
      trim: true,
    },
    emailAddress: {
      type: String,
      required: true, // Email address of the outlet
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String, // Password for the outlet login
    },
    image: {
      type: String, // Path or URL to the outlet's image
    },
    certificate: {
      type: String, // Path or URL to the certificate file
    },
    longitude: {
      type: Number, // Longitude coordinate of the outlet
      required: true,
    },
    latitude: {
      type: Number, // Latitude coordinate of the outlet
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Outlet", OutletSchema);
