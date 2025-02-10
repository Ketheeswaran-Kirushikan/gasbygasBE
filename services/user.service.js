const bcrypt = require("bcryptjs");
const User = require("../models/user.model"); // Unified User Schema
const cloudinary = require("../utils/cloudinary.utils");

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

// Create User
const createUser = async (data, file) => {
  let imageUrl = "";

  // Upload image to Cloudinary if a file is provided
  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrl = result.secure_url;
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Prepare data for saving
  const userData = {
    ...data,
    password: hashedPassword, // Store the hashed password
    image: imageUrl,
  };

  // Create and save the user record in the database
  return await User.create(userData);
};

const updateUserById = async (id, data, file) => {
  let updatedData = { ...data };

  // Upload image to Cloudinary if a file is provided
  if (file) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      updatedData.image = result.secure_url; // Save Cloudinary URL
    } catch (error) {
    }
  }

  // Hash the new password if provided
  if (data.password) {
    updatedData.password = await bcrypt.hash(data.password, 10);
  }

  // Update user in database
  return await User.findByIdAndUpdate(id, updatedData, { new: true });
};


// Delete User by ID
const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

// Get User by ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// Get All Users
const getAllUsers = async () => {
  try {

    const allUsers = await User.find({}, { password: 0 }); // Exclude passwords

    return {
      allUsers,
    };
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

module.exports = {
  createUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getAllUsers,
};
