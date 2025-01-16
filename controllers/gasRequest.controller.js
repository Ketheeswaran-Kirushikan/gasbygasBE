const GasRequestService = require("../services/gasRequest.service");

// Create Gas Request
const createGasRequest = async (req, res) => {
  try {
    const gasRequest = await GasRequestService.createGasRequest(req.body, req.file);
    res.status(201).json({
      message: "Gas Request created successfully",
      gasRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Gas Request by ID
const updateGasRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGasRequest = await GasRequestService.updateGasRequestById(id, req.body, req.file);

    if (!updatedGasRequest) {
      return res.status(404).json({ error: "Gas Request not found" });
    }

    res.status(200).json({
      message: "Gas Request updated successfully",
      gasRequest: updatedGasRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Gas Request by ID
const deleteGasRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGasRequest = await GasRequestService.deleteGasRequestById(id);

    if (!deletedGasRequest) {
      return res.status(404).json({ error: "Gas Request not found" });
    }

    res.status(200).json({ message: "Gas Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Gas Request by ID
const getGasRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const gasRequest = await GasRequestService.getGasRequestById(id);

    if (!gasRequest) {
      return res.status(404).json({ error: "Gas Request not found" });
    }

    res.status(200).json(gasRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Gas Requests by Outlet
const getAllGasRequestsByOutlet = async (req, res) => {
  try {
    const { outletId } = req.params;
    const gasRequests = await GasRequestService.getAllGasRequestsByOutlet(outletId);

    res.status(200).json(gasRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGasRequest,
  updateGasRequestById,
  deleteGasRequestById,
  getGasRequestById,
  getAllGasRequestsByOutlet,
};
