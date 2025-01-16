const OutletService = require("../services/outlet.service");

// Create Outlet
const createOutlet = async (req, res) => {
    try {
      const outlet = await OutletService.createOutlet(req.body, req.files);
      res.status(201).json({
        message: "Outlet created successfully.",
        outlet,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update Outlet by ID
  const updateOutletById = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedOutlet = await OutletService.updateOutletById(
        id,
        req.body,
        req.files
      );
  
      if (!updatedOutlet) {
        return res.status(404).json({ error: "Outlet not found." });
      }
  
      res.status(200).json({
        message: "Outlet updated successfully.",
        outlet: updatedOutlet,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Delete Outlet by ID
const deleteOutletById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOutlet = await OutletService.deleteOutletById(id);

    if (!deletedOutlet) {
      return res.status(404).json({ error: "Outlet not found" });
    }

    res.status(200).json({ message: "Outlet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Outlet by ID
const getOutletById = async (req, res) => {
  try {
    const { id } = req.params;
    const outlet = await OutletService.getOutletById(id);

    if (!outlet) {
      return res.status(404).json({ error: "Outlet not found" });
    }

    res.status(200).json(outlet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Outlets
const getAllOutlets = async (req, res) => {
  try {
    const outlets = await OutletService.getAllOutlets();
    res.status(200).json(outlets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOutlet,
  updateOutletById,
  deleteOutletById,
  getOutletById,
  getAllOutlets,
};
