const express = require("express");
const router = express.Router();
const dispatchController = require("../controllers/dispatch.controller");

// Route for creating a new Dispatch Admin
router.post("/create", dispatchController.createDispatch);

module.exports = router;
