const mongoose = require("mongoose");

const GasSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true, // Gas weight (e.g., 5, 12.5, 37.5)
    },
    price: {
      type: Number,
      required: true, // Price for the specified weight
    },
    isActive: {
      type: Boolean,
      default: true, // Whether this gas type and weight is active
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gas", GasSchema);
