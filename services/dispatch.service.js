const Dispatch = require("../models/dispatch.model");
const bcrypt = require("bcryptjs");

// Service for creating a new Dispatch Admin
const createDispatch = async (adminName, password) => {
  // Check if a dispatch admin already exists (unique adminName)
  const existingDispatch = await Dispatch.findOne({ adminName });
  if (existingDispatch) {
    throw new Error("Admin name already exists.");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create and save the dispatch admin
  const newDispatch = await Dispatch.create({
    adminName,
    password: hashedPassword,
  });

  return {
    id: newDispatch._id,
    adminName: newDispatch.adminName,
    createdAt: newDispatch.createdAt,
    updatedAt: newDispatch.updatedAt,
  };
};

module.exports = {
  createDispatch,
};
