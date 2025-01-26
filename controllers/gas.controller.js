const GasService = require("../services/gas.service");

// Create Gas
const createGas = async (req, res) => {
  try {
    const gas = await GasService.createGas(req.body);
    res.status(201).json({
      message: "Gas created successfully",
      gas,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Gas by ID
const updateGasById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGas = await GasService.updateGasById(id, req.body);

    if (!updatedGas) {
      return res.status(404).json({ error: "Gas not found" });
    }

    res.status(200).json({
      message: "Gas updated successfully",
      gas: updatedGas,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Gas by ID
const deleteGasById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGas = await GasService.deleteGasById(id);

    if (!deletedGas) {
      return res.status(404).json({ error: "Gas not found" });
    }

    res.status(200).json({ message: "Gas deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Gas by Type
const getGasByType = async (req, res) => {
  try {
    const { type } = req.params;
    const gases = await GasService.getGasByType(type);

    if (!gases.length) {
      return res.status(404).json({ error: "No gases found for this type" });
    }

    res.status(200).json(gases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Gases
const getAllGases = async (req, res) => {
  try {
    const gases = await GasService.getAllGases();
    res.status(200).json(gases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createGas,
  updateGasById,
  deleteGasById,
  getGasByType,
  getAllGases,
};
