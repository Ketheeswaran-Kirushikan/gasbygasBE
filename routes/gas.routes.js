const express = require("express");
const router = express.Router();
const GasController = require("../controllers/gas.controller");

// Routes for managing gas
router.post("/create", GasController.createGas);
router.put("/update/:id", GasController.updateGasById);
router.delete("/delete/:id", GasController.deleteGasById);
router.get("/type/:type", GasController.getGasByType);
router.get("/all", GasController.getAllGases);

module.exports = router;
