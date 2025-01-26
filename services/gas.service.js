const Gas = require("../models/gas.model");

// Create a new Gas
const createGas = async (data) => {
  const newGas = await Gas.create(data);
  return newGas;
};

// Update Gas by ID
const updateGasById = async (id, data) => {
  const updatedGas = await Gas.findByIdAndUpdate(id, data, {
    new: true, // Return the updated document
  });
  return updatedGas;
};

// Delete Gas by ID
const deleteGasById = async (id) => {
  const deletedGas = await Gas.findByIdAndDelete(id);
  return deletedGas;
};

// Get Gas by Type
const getGasByType = async (type) => {
  const gasList = await Gas.find({ type });
  return gasList;
};

// Get All Gases
const getAllGases = async () => {
  const gases = await Gas.find();
  return gases;
};

module.exports = {
  createGas,
  updateGasById,
  deleteGasById,
  getGasByType,
  getAllGases,
};
