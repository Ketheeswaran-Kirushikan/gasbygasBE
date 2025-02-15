const dispatchService = require("../services/dispatch.service");

// ✅ Create Dispatch Admin
const createDispatch = async (req, res) => {
  try {
    const { adminName, password } = req.body;
    if (!adminName || !password) {
      return res.status(400).json({ error: "Admin name and password are required." });
    }
    const dispatch = await dispatchService.createDispatch(adminName, password);
    res.status(201).json({ message: "Dispatch admin created successfully.", dispatch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Dispatch Admins
const getAllDispatches = async (req, res) => {
  try {
    const dispatches = await dispatchService.getAllDispatches();
    res.json(dispatches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Dispatch Admin by ID
const getDispatchById = async (req, res) => {
  try {
    const dispatch = await dispatchService.getDispatchById(req.params.id);
    res.json(dispatch);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// ✅ Update Dispatch Admin
const updateDispatch = async (req, res) => {
  try {
    const updatedDispatch = await dispatchService.updateDispatch(req.params.id, req.body);
    res.json(updatedDispatch);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// ✅ Delete Dispatch Admin
const deleteDispatch = async (req, res) => {
  try {
    const result = await dispatchService.deleteDispatch(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// ✅ Add Gas Stock to Existing Dispatch Admin
const addGasStockController = async (req, res) => {
  try {
    const { dispatchId } = req.params;
    const newGasStock = req.body; // Expecting `{ gasType, weight, quantity, price, individualPrice }`
    console.log(newGasStock)
    console.log(dispatchId)


    const updatedGasStock = await  dispatchService.addGasStock(dispatchId, newGasStock);
    res.status(200).json({ message: "Gas stock added successfully.", updatedGasStock });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete Gas Stock by Gas Type & Weight
const deleteGasStockController = async (req, res) => {
  try {
    const { dispatchId } = req.params;
    const { gasType, weight } = req.body;

    const response = await  dispatchService.deleteGasStock(dispatchId, gasType, weight);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createDispatch,
  getAllDispatches,
  getDispatchById,
  updateDispatch,
  deleteDispatch,
  addGasStockController,
  deleteGasStockController,
};
