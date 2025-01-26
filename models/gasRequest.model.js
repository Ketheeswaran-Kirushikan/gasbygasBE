const mongoose = require("mongoose");

const GasRequestSchema = new mongoose.Schema(
  {
    gasType: {
      type: String,
      required: true, // Specify that this field is required
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved","process", "delivered", "rejected"], // Define possible status values
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
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
    },
    outletDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet", // Reference to the Outlet schema
    },
    dispatchDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dispatch", // Reference to the Outlet schema
    },
    file: {
      type: String, // URL or path to the uploaded file
    },
    message: {
      type: String, // Optional message from the customer
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set the default creation date to the current date and time
    },
    deliveryDate: {
      type: Date,
      default: function () {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 14); // Add 14 days (2 weeks) to the current date
        return currentDate;
      }, // Automatically calculate the delivery date
    },
    price: {
      type: Number, // Price of the gas units in the selected outlet
      required: true, // Specify that this field is required
    },
    referenceNumber: {
      type: String, // Unique reference number for the gas request
      unique: true, // Make sure that this field is unique across all gas requests
      required: true, // Specify that this field is required
    },
    paymentOption: {
      type: String,
      enum: ["cash payment", "bank transfer","online payment"], // Define payment options
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"], // Define possible payment statuses
      default: "pending", // Default payment status is "pending"
    },
    cashPaymentDate:{
      type: Date,
      default: null, // Default value is null
    },
    handoverEmptyCylinder: {
      type: Boolean,
      default: false, // Default value is "no"
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("GasRequest", GasRequestSchema);
