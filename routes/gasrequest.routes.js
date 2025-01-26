const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.middle");
const GasRequestController = require("../controllers/gasRequest.controller");

// Create Gas Request
router.post(
  "/create",
  multer.single("file"), // For file upload
  GasRequestController.createGasRequest
);

// Update Gas Request by ID
router.put(
  "/update/:referenceNumber",
  multer.single("file"), // For file upload
  GasRequestController.updateGasRequestById
);

// Delete Gas Request by ID
router.delete("/delete/:id", GasRequestController.deleteGasRequestById);

// Get Gas Request by ID
router.get("/get/:id", GasRequestController.getGasRequestById);

// Get All Gas Requests by Outlet ID
router.get("/getall/outlet/:outletId", GasRequestController.getAllGasRequestsByOutlet);

router.get("/getall/user/:userId", GasRequestController.getAllGasRequestsByUser);

module.exports = router;
