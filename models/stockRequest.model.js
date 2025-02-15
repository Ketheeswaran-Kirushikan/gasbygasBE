const mongoose = require("mongoose");

const StockRequestSchema = new mongoose.Schema(
  {
    outletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet", // Reference to Outlet Schema
      required: true,
    },
    dispatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dispatch", // Reference to Dispatch Schema
      required: true,
    },
    stockDetails: [
      {
        gasType: {
          type: String,
          required: true,
        },
        weight: {
          type: Number, // In KG
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Ensuring at least 1 is ordered
        },
        price: {
          type: Number,
          required: true,
          min: 0, // Ensuring non-negative price
        },
        individualPrice:{
            type: Number,
            required: true,
        }
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation timestamp
    },
    deliveryDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockRequest", StockRequestSchema);
