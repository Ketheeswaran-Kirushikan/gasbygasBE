const StockRequest = require("../models/stockRequest.model");
const Notification = require("../models/notification.model");
const Outlet = require("../models/outlet.model");

// Utility to send notifications
const sendNotification = async ({ outletId, dispatchId, message }) => {
  try {
    const notificationData = { outletId, dispatchId, message };
    await Notification.create(notificationData);

    if (outletId) {
      console.log(`Notification to Outlet (ID: ${outletId}): ${message}`);
    }
    if (dispatchId) {
      console.log(`Notification to Dispatch (ID: ${dispatchId}): ${message}`);
    }
  } catch (error) {
    console.error("Error sending notification:", error.message);
  }
};

// Create Stock Request
const createStockRequest = async (data) => {
  const newStockRequest = await StockRequest.create(data);

  // Send Notification to Dispatch
  const notificationMessage = `New stock request created by Outlet (ID: ${data.outletId}). Awaiting approval.`;
  await sendNotification({
    dispatchId: data.dispatchId,
    message: notificationMessage,
  });

  return newStockRequest;
};

const updateStockRequestById = async (id, data) => {
    // Step 1: Find the stock request by ID
    const stockRequest = await StockRequest.findById(id);
    if (!stockRequest) {
        throw new Error("Stock request not found");
    }

    // Step 2: Update the stock request
    const updatedStockRequest = await StockRequest.findByIdAndUpdate(id, data, { new: true });

    let notificationMessage = "";
    let updatedOutlet = null;

    // Step 3: Handle status-specific logic
    if (data.status === "Approved") {
        notificationMessage = `Your stock request (ID: ${id}) has been approved by Dispatch.`;
    } else if (data.status === "Rejected") {
        notificationMessage = `Your stock request (ID: ${id}) has been rejected by Dispatch.`;
    } else if (data.status === "Delivered") {
        notificationMessage = `Your stock request (ID: ${id}) has been marked as delivered.`;

        // Step 4: Find the outlet associated with the stock request
        const outlet = await Outlet.findById(stockRequest.outletId);
        if (!outlet) {
            throw new Error("Outlet not found while updating stock.");
        }

        // Step 5: Update the outlet's gas stock based on the stock request details
        stockRequest.stockDetails.forEach((item) => {
            const stockIndex = outlet.gasStock.findIndex(
                (gs) =>
                    gs.gasType === item.gasType &&
                    gs.weight === item.weight &&
                    gs.price === item.price &&
                    gs.individualPrice === item.individualPrice
            );

            if (stockIndex !== -1) {
                // Update existing gas stock quantity
                outlet.gasStock[stockIndex].quantity += item.quantity;
            } else {
                // Add new gas type if it doesn't exist
                outlet.gasStock.push({
                    gasType: item.gasType,
                    weight: item.weight,
                    quantity: item.quantity,
                    price: item.price,
                    individualPrice: item.individualPrice,
                });
            }
        });

        // Step 6: Save the updated outlet
        updatedOutlet = await outlet.save();
    }

    // Step 7: Send notification if there's a message
    if (notificationMessage) {
        await sendNotification({
            outletId: stockRequest.outletId,
            dispatchId: stockRequest.dispatchId,
            message: notificationMessage,
        });
    }

    // Step 8: Return the updated stock request and outlet (if applicable)
    return { updatedStockRequest, updatedOutlet };
};
  
const deleteStockRequestById = async (id) => {
  const deletedStockRequest = await StockRequest.findByIdAndDelete(id);

  if (!deletedStockRequest) {
    throw new Error("Stock request not found");
  }

  const notificationMessage = `Stock request (ID: ${id}) has been deleted.`;

  await sendNotification({
    outletId: deletedStockRequest.outletId,
    dispatchId: deletedStockRequest.dispatchId,
    message: notificationMessage,
  });

  return deletedStockRequest;
};

// Get Stock Request by ID
const getStockRequestById = async (id) => {
  return await StockRequest.findById(id).populate("outletId dispatchId");
};

// Get All Stock Requests
const getAllStockRequests = async () => {
  return await StockRequest.find().populate("outletId dispatchId");
};

// Get Stock Requests by Outlet ID
const getStockRequestsByOutlet = async (outletId) => {
  return await StockRequest.find({ outletId }).populate("dispatchId");
};

// Get Stock Requests by Dispatch ID
const getStockRequestsByDispatch = async (dispatchId) => {
  return await StockRequest.find({ dispatchId }).populate("outletId");
};

module.exports = {
  createStockRequest,
  updateStockRequestById,
  deleteStockRequestById,
  getStockRequestById,
  getAllStockRequests,
  getStockRequestsByOutlet,
  getStockRequestsByDispatch,
};
