const mongoose = require("mongoose");

const GasRequestSchema = new mongoose.Schema(
  {
    gasType: {
      type: String,
      required: true, // Specify that this field is required
      enum: ["LPG", "CNG", "Propane", "Butane"], // Example gas types
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "delivered", "rejected"], // Define possible status values
      default: "pending", // Set the default status to "pending"
    },
    gasWeight: {
      type: Number,
      required: true, // Gas weight in kilograms
    },
    quantity: {
      type: Number,
      required: true, // Number of gas units requested
    },
    preferDeliveryDate: {
      type: Date,
      required: true, // Preferred delivery date
    },
    exactAddress: {
      type: String,
      required: true, // Full delivery address
    },
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true,
    },
    outletDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet", // Reference to the Outlet schema
      required: true,
    },
    file: {
      type: String, // URL or path to the uploaded file
    },
    message: {
      type: String, // Optional message from the customer
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("GasRequest", GasRequestSchema);
