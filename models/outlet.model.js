const mongoose = require("mongoose");

const OutletSchema = new mongoose.Schema(
  {
    outletName: {
      type: String,
      required: true,
      trim: true,
    },
    outletAddress: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    certificate: {
      type: String,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      default: "outlet",
      enum: ["outlet"],
    },
    gasStock: [
      {
        gas: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Gas", // Reference to Gas schema
          required: true,
        },
        quantity: {
          type: Number,
          required: true, // Quantity of this gas type and weight at the outlet
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Outlet", OutletSchema);
