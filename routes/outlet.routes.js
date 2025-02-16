const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.middle");
const OutletController = require("../controllers/outlet.controller");

// const authenticateDispatch = require("../middleware/authenticatedDispatch");

// Routes for Outlet
router.post(
  "/create",
  multer.fields([{ name: "image" }, { name: "certificate" }]),
  OutletController.createOutlet
);
router.put(
  "/update/:id",
  multer.fields([{ name: "image" }, { name: "certificate" }]),
  OutletController.updateOutletById
);
router.delete("/delete/:id", OutletController.deleteOutletById);
router.get("/get/:id", OutletController.getOutletById);
router.get("/getall", OutletController.getAllOutlets);

module.exports = router;
