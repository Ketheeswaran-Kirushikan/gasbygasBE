const GasRequest = require("../models/gasRequest.model");
const cloudinary = require("../utils/cloudinary.utils"); // Optional, for file uploads

// Create Gas Request
const createGasRequest = async (data, file) => {
  let fileUrl = "";

  // Upload file to Cloudinary if a file is provided
  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    fileUrl = result.secure_url;
  }

  const gasRequestData = {
    ...data,
    file: fileUrl,
  };

  // Save the gas request in the database
  const newGasRequest = await GasRequest.create(gasRequestData);
  return newGasRequest;
};

// Update Gas Request by ID
const updateGasRequestById = async (id, data, file) => {
  let updatedData = { ...data };

  // If a new file is provided, upload it to Cloudinary
  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    updatedData.file = result.secure_url;
  }

  // Update the gas request in the database
  const updatedGasRequest = await GasRequest.findByIdAndUpdate(id, updatedData, {
    new: true, // Return the updated document
  });

  return updatedGasRequest;
};

// Delete Gas Request by ID
const deleteGasRequestById = async (id) => {
  const deletedGasRequest = await GasRequest.findByIdAndDelete(id);
  return deletedGasRequest;
};

// Get Gas Request by ID
const getGasRequestById = async (id) => {
  const gasRequest = await GasRequest.findById(id).populate("outletDetails"); // Populate outlet details
  return gasRequest;
};

// Get All Gas Requests for a Specific Outlet
const getAllGasRequestsByOutlet = async (outletId) => {
  const gasRequests = await GasRequest.find({ outletDetails: outletId }).populate("outletDetails");
  return gasRequests;
};

module.exports = {
  createGasRequest,
  updateGasRequestById,
  deleteGasRequestById,
  getGasRequestById,
  getAllGasRequestsByOutlet,
};
