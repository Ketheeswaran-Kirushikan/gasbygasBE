const mongoose = require("mongoose");

const DispatchSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure unique admin names
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      default: "dispatch",
      enum: ["dispatch"],
    },
    gasStock: [
      {
        gasType: {
          type: String,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        individualPrice: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

module.exports = mongoose.model("Dispatch", DispatchSchema);
