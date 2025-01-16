const dispatchService = require("../services/dispatch.service");

// Controller for creating a new Dispatch Admin
const createDispatch = async (req, res) => {
  try {
    const { adminName, password } = req.body;

    // Validate input
    if (!adminName || !password) {
      return res
        .status(400)
        .json({ error: "Admin name and password are required." });
    }

    // Call service to create dispatch admin
    const dispatch = await dispatchService.createDispatch(adminName, password);

    res.status(201).json({
      message: "Dispatch admin created successfully.",
      dispatch,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDispatch,
};
