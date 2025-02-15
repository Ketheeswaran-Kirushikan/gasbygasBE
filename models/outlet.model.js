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
        gasType: {
          type: String,
          required: true,
        },
        weight: {
          type: Number,
          required: true, // Gas weight (e.g., 5kg, 12.5kg, 37.5kg)
        },
        quantity: {
          type: Number,
          required: true, // Number of cylinders available
          default: 0,
        },
        price: {
          type: Number,
          required: true,
          min: 0, // Ensuring non-negative price
        },
        individualPrice:{
            type: Number,
            required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Outlet", OutletSchema);
