const express = require("express");
const stockController = require("../controllers/stockRequest.controller");

const router = express.Router();

// Create Stock Request
router.post("/create", stockController.createStockRequest);

// Update Stock Request by ID
router.put("/update/:id", stockController.updateStockRequestById);

// Delete Stock Request by ID
router.delete("/delete/:id", stockController.deleteStockRequestById);

// Get All Stock Requests
router.get("/getall", stockController.getAllStockRequests);

// Get Stock Request by ID
router.get("/getbyid/:id", stockController.getStockRequestById);

// Get Stock Requests by Outlet ID
router.get("/getbyid/outlet/:outletId", stockController.getStockRequestsByOutlet);

// Get Stock Requests by Dispatch ID
router.get("/getbyid/dispatch/:dispatchId", stockController.getStockRequestsByDispatch);

module.exports = router;
