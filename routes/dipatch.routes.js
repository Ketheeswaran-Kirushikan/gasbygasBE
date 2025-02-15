const express = require("express");
const router = express.Router();
const dispatchController = require("../controllers/dispatch.controller");

// ✅ Create Dispatch Admin
router.post("/create", dispatchController.createDispatch);

// ✅ Get All Dispatch Admins
router.get("/getall", dispatchController.getAllDispatches);

// ✅ Get Dispatch Admin by ID
router.get("/get/:id", dispatchController.getDispatchById);

// ✅ Update Dispatch Admin
router.put("/update/:id", dispatchController.updateDispatch);

// ✅ Delete Dispatch Admin
router.delete("/delete/:id", dispatchController.deleteDispatch);

// ✅ Route to add gas stock to existing dispatch admin
router.post("/:dispatchId/add-gas", dispatchController.addGasStockController);

// ✅ Route to delete gas stock by gasType & weight
router.delete("/:dispatchId/delete-gas", dispatchController.deleteGasStockController);

module.exports = router;
