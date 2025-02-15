const Dispatch = require("../models/dispatch.model");
const bcrypt = require("bcryptjs");

// ✅ Create Dispatch Admin
const createDispatch = async (adminName, password) => {
  const existingDispatch = await Dispatch.findOne({ adminName });
  if (existingDispatch) {
    throw new Error("Admin name already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newDispatch = await Dispatch.create({
    adminName,
    password: hashedPassword,
  });

  return {
    id: newDispatch._id,
    adminName: newDispatch.adminName,
    createdAt: newDispatch.createdAt,
    updatedAt: newDispatch.updatedAt,
  };
};

// ✅ Get All Dispatch Admins
const getAllDispatches = async () => {
  return await Dispatch.find({}, "-password"); // Exclude password
};

// ✅ Get Dispatch Admin by ID
const getDispatchById = async (id) => {
  const dispatch = await Dispatch.findById(id, "-password"); // Exclude password
  if (!dispatch) throw new Error("Dispatch admin not found.");
  return dispatch;
};

// ✅ Update Dispatch Admin
const updateDispatch = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const updatedDispatch = await Dispatch.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedDispatch) throw new Error("Dispatch admin not found.");

  return updatedDispatch;
};

// ✅ Delete Dispatch Admin
const deleteDispatch = async (id) => {
  const deletedDispatch = await Dispatch.findByIdAndDelete(id);
  if (!deletedDispatch) throw new Error("Dispatch admin not found.");
  return { message: "Dispatch admin deleted successfully." };
};

const addGasStock = async (dispatchId, newGasStock) => {
  try {
    // ✅ Step 1: Find the dispatch admin
    const dispatchAdmin = await Dispatch.findById(dispatchId);

    if (!dispatchAdmin) {
      console.error("Dispatch admin not found.");
      throw new Error("Dispatch admin not found.");
    }

    console.log("Before adding new gas stock:", dispatchAdmin.gasStock);

    // ✅ Step 2: Validate newGasStock
    if (!newGasStock.gasType || !newGasStock.weight || !newGasStock.quantity || !newGasStock.price) {
      console.error("Invalid gasStock data:", newGasStock);
      throw new Error("Invalid gas stock data.");
    }

    // ✅ Step 3: Push new gas stock
    dispatchAdmin.gasStock.push(newGasStock);
    dispatchAdmin.markModified("gasStock"); // 🔹 Important to detect array changes

    // ✅ Step 4: Save updated document
    await dispatchAdmin.save();

    // ✅ Step 5: Console log the updated data
    console.log("Newly added gas stock:", newGasStock);
    console.log("Updated gas stock list:", dispatchAdmin.gasStock);

    return dispatchAdmin.gasStock;
  } catch (error) {
    console.error("Error adding gas stock:", error.message);
    throw error;
  }
};



// ✅ Delete Gas Stock by Gas Type & Weight
const deleteGasStock = async (dispatchId, gasType, weight) => {
  const dispatchAdmin = await Dispatch.findById(dispatchId);
  if (!dispatchAdmin) throw new Error("Dispatch admin not found.");

  // Filter out the gas stock entry to delete
  dispatchAdmin.gasStock = dispatchAdmin.gasStock.filter(
    (stock) => !(stock.gasType === gasType && stock.weight === weight)
  );

  await dispatchAdmin.save();

  return { message: "Gas stock deleted successfully." };
};

module.exports = {
  createDispatch,
  getAllDispatches,
  getDispatchById,
  updateDispatch,
  deleteDispatch,
  addGasStock,
  deleteGasStock,
};
