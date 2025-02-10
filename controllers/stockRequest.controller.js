const stockService = require("../services/stockRequest.service");

// Create a new stock request
exports.createStockRequest = async (req, res) => {
    console.log("Creating stock request:" + req.body)
  try {
    const stockRequest = await stockService.createStockRequest(req.body);
    res.status(201).json(stockRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a stock request by ID
exports.updateStockRequestById = async (req, res) => {
  try {
    const stockRequest = await stockService.updateStockRequestById(req.params.id, req.body);
    if (!stockRequest) return res.status(404).json({ message: "Stock Request not found" });
    res.json(stockRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a stock request by ID
exports.deleteStockRequestById = async (req, res) => {
  try {
    const stockRequest = await stockService.deleteStockRequestById(req.params.id);
    if (!stockRequest) return res.status(404).json({ message: "Stock Request not found" });
    res.json({ message: "Stock Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all stock requests
exports.getAllStockRequests = async (req, res) => {
  try {
    const stockRequests = await stockService.getAllStockRequests();
    res.json(stockRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stock request by ID
exports.getStockRequestById = async (req, res) => {
  try {
    const stockRequest = await stockService.getStockRequestById(req.params.id);
    if (!stockRequest) return res.status(404).json({ message: "Stock Request not found" });
    res.json(stockRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stock requests by Outlet ID
exports.getStockRequestsByOutlet = async (req, res) => {
  try {
    const stockRequests = await stockService.getStockRequestsByOutlet(req.params.outletId);
    res.json(stockRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stock requests by Dispatch ID
exports.getStockRequestsByDispatch = async (req, res) => {
  try {
    const stockRequests = await stockService.getStockRequestsByDispatch(req.params.dispatchId);
    res.json(stockRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
