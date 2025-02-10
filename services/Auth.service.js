const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Dispatch = require("../models/dispatch.model");
const Outlet = require("../models/outlet.model");
const User = require("../models/user.model"); // Unified User schema for both consumer and business

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";
const loginUser = async (emailOrAdminName, password) => {
  const models = [
    { model: Dispatch, identifier: "adminName", userType: "dispatch" },
    { model: Outlet, identifier: "emailAddress", userType: "outlet" },
    { model: User, identifier: "email", userType: "consumer" }, // Consumer users
  ];
  for (const { model, identifier, userType } of models) {
    const user = await model.findOne({ [identifier]: emailOrAdminName });
    if (user) {
      // Check if the password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
      }
      const token = jwt.sign({ id: user._id, userType }, SECRET_KEY, {
        expiresIn: "1d",
      });
      return {
        token,
        user: {
          id: user._id, // Explicitly include the userId
          userType,
          ...user.toObject(),
        },
      };
    }
  }
  throw new Error("Invalid credentials.");
};

// Logout Service
const logoutUser = async (token) => {
  // Implement token blacklist mechanism here if necessary
  return true; // Placeholder implementation
};

module.exports = {
  loginUser,
  logoutUser,
};
