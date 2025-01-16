const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["consumer", "businessIndustry"], // Either "consumer" or "businessIndustry"
    },
    // Common Fields for All Users
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"], // Email validation
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or path to the uploaded profile picture
    },

    // Consumer-Specific Fields
    firstName: {
      type: String,
      required: function () {
        return this.userType === "consumer";
      },
    },
    lastName: {
      type: String,
      required: function () {
        return this.userType === "consumer";
      },
    },
    NIC: {
      type: String,
      unique: true,
      sparse: true, // Not required for businessIndustry
      required: function () {
        return this.userType === "consumer";
      },
    },

    // BusinessIndustry-Specific Fields
    companyName: {
      type: String,
      required: function () {
        return this.userType === "businessIndustry";
      },
    },
    registrationNumber: {
      type: String,
      unique: true,
      sparse: true, // Not required for consumer
    },
    businessCategory: {
      type: String,
    },
    certification: {
      type: String, // URL or path to the uploaded file
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
