const GasRequest = require("../models/gasRequest.model");
const Notification = require("../models/notification.model");
const Outlet = require("../models/outlet.model");
const Dispatch = require("../models/dispatch.model");
const User = require("../models/user.model");
const cloudinary = require("../utils/cloudinary.utils");
const sendGrid = require("@sendgrid/mail");

sendGrid.setApiKey(process.env.SENDGRID_KEY);

// Utility to generate a unique reference number
const generateReferenceNumber = async () => {
  const lastRequest = await GasRequest.findOne().sort({ createdAt: -1 });
  let newReferenceNumber = "REF001";

  if (lastRequest && lastRequest.referenceNumber) {
    const lastNumber = parseInt(
      lastRequest.referenceNumber.replace("REF", ""),
      10
    );
    newReferenceNumber = `REF${String(lastNumber + 1).padStart(3, "0")}`;
  }

  return newReferenceNumber;
};

// Utility to send notifications
const sendNotification = async ({ userId, outletId, dispatchId, message }) => {
  try {
    const notificationData = { userId, outletId, dispatchId, message };
    await Notification.create(notificationData);

    // Only log notifications for outlets or dispatch
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

// Utility to send emails
const sendEmail = async ({ recipientEmail, subject, message }) => {
  try {
    const emailContent = {
      to: recipientEmail,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: subject,
      html: message,
    };

    await sendGrid.send(emailContent);
    console.log("Email sent successfully to:", recipientEmail);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

// Create Gas Request
const createGasRequest = async (data, file) => {
  let fileUrl = "";

  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    fileUrl = result.secure_url;
  }

  const referenceNumber = await generateReferenceNumber();

  const gasRequestData = {
    ...data,
    file: fileUrl,
    referenceNumber,
  };

  const newGasRequest = await GasRequest.create(gasRequestData);
  console.log("pun",newGasRequest)

  // Send Notification
  const notificationMessage = `New gas request created by ${
    data.userDetails ? "user" : "outlet"
  }: ${referenceNumber}`;
  if (data.outletDetails) {
    await sendNotification({
      outletId: data.outletDetails,
      message: notificationMessage,
    });
  } else if (data.dispatchDetails) {
    await sendNotification({
      dispatchId: data.dispatchDetails,
      message: notificationMessage,
    });
  }

  // Send Email
  const recipientEmail = data.outletDetails
    ? (await Outlet.findById(data.outletDetails)).email
    : data.dispatchDetails
    ? (await Dispatch.findById(data.dispatchDetails)).email
    : null;

  if (recipientEmail) {
    await sendEmail({
      recipientEmail,
      subject: "New Gas Request Created",
      message: `<p>${notificationMessage}</p>`,
    });
  }

  return newGasRequest;
};

const updateGasRequestById = async (referenceNumber, data, file) => {
  let updatedData = { ...data };

  // Handle file upload if provided
  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    updatedData.file = result.secure_url;
  }

  // Find the gas request by referenceNumber
  const gasRequest = await GasRequest.findOne({ referenceNumber });

  if (!gasRequest) {
    throw new Error("Gas request not found");
  }

  // Handle payment type and notifications
  let notificationMessage = "";
  let paymentUpdated = false;

  if (updatedData.paymentOption === "cash payment") {
    updatedData.cashPaymentDate = new Date(); // Record the cash payment date
    paymentUpdated = true;
    notificationMessage = `The user has selected cash payment for the request (Reference: ${referenceNumber}). Payment date recorded.`;
  } else if (
    updatedData.paymentOption === "bank transfer" ||
    updatedData.paymentOption === "online payment"
  ) {
    updatedData.paymentStatus = "completed";
    updatedData.handoverEmptyCylinder = true;
    paymentUpdated = true;

    notificationMessage = `Payment of ${gasRequest.price} via ${updatedData.paymentOption} and cylinder handover have been successfully completed for request (Reference: ${referenceNumber}). Please update the process.`;
  }

  // Update the gas request in the database
  const updatedGasRequest = await GasRequest.findOneAndUpdate(
    { referenceNumber },
    updatedData,
    { new: true }
  );

  // ✅ Send notification to user
  if (paymentUpdated || updatedGasRequest.status !== gasRequest.status) {
    if (gasRequest.userDetails) {
      await sendNotification({
        userId: gasRequest.userDetails,
        message: notificationMessage,
      });

      const user = await User.findById(gasRequest.userDetails);
      if (user && user.email) {
        await sendEmail({
          recipientEmail: user.email,
          subject: `Gas Request Update - Reference: ${referenceNumber}`,
          message: notificationMessage,
        });
      }
    }
  }

  // ✅ Handle status updates for dispatch notification
  if (updatedGasRequest.status !== gasRequest.status) {
    if (updatedGasRequest.status === "approved") {
      notificationMessage = `Gas request (Reference: ${referenceNumber}) has been approved. User must complete payment of ${gasRequest.price} and hand over cylinders within 2 days.`;
    } else if (updatedGasRequest.status === "rejected") {
      notificationMessage = `Gas request (Reference: ${referenceNumber}) has been rejected.`;
    } else {
      notificationMessage = `Gas request (Reference: ${referenceNumber}) is now in '${updatedGasRequest.status}' status.`;
    }

    // ✅ Notify Dispatch (New Logic)
    if (gasRequest.dispatchDetails) {
      await sendNotification({
        userId: gasRequest.dispatchDetails,
        message: `DISPATCH ALERT: ${notificationMessage}`,
      });


      // ✅ Send Email to Dispatch (if applicable)
      const dispatchAdmin = await User.findById(gasRequest.dispatchDetails);
      if (dispatchAdmin && dispatchAdmin.email) {
        await sendEmail({
          recipientEmail: dispatchAdmin.email,
          subject: `Gas Request Dispatch Update - Reference: ${referenceNumber}`,
          message: notificationMessage,
        });
      }
    }
  }

  return updatedGasRequest;
};

// Delete Gas Request by ID
const deleteGasRequestByReferenceNumber = async (referenceNumber) => {
  console.log(`Deleting Gas Request with Reference Number:`, referenceNumber); // ✅ Debugging log

  // Find and delete the gas request using referenceNumber
  const deletedGasRequest = await GasRequest.findOneAndDelete({ referenceNumber });

  if (!deletedGasRequest) {
    throw new Error(`Gas request with referenceNumber ${referenceNumber} not found`);
  }

  console.log(`✅ Successfully Deleted Gas Request:`, deletedGasRequest);

  // Send notifications if needed
  const notificationMessage = `Gas request ${deletedGasRequest.referenceNumber} has been deleted.`;

  if (deletedGasRequest.outletDetails) {
    await sendNotification({
      outletId: deletedGasRequest.outletDetails,
      message: notificationMessage,
    });
  }

  if (deletedGasRequest.dispatchDetails) {
    await sendNotification({
      dispatchId: deletedGasRequest.dispatchDetails,
      message: notificationMessage,
    });
  }

  return deletedGasRequest;
};

// Get Gas Request by ID
const getGasRequestById = async (id) => {
  const gasRequest = await GasRequest.findById(id).populate("outletDetails");
  return gasRequest;
};

// Get All Gas Requests for a Specific Outlet
const getAllGasRequestsByOutlet = async (outletId) => {
  const gasRequests = await GasRequest.find({
    outletDetails: outletId,
  }).populate("outletDetails");
  return gasRequests;
};

// Get All Gas Requests for a Specific User
const getAllGasRequestsByUser = async (userId) => {
  const gasRequests = await GasRequest.find({ userDetails: userId }).populate(
    "userDetails"
  );
  return gasRequests;
};

// Get All Gas Requests for a Specific User
const getAllGasRequestsByDispatch = async (id) => {
  const gasRequests = await GasRequest.find({ dispatchDetails: id }).populate(
    "userDetails"
  );
  return gasRequests;
};

module.exports = {
  createGasRequest,
  updateGasRequestById,
  deleteGasRequestByReferenceNumber,
  getGasRequestById,
  getAllGasRequestsByOutlet,
  getAllGasRequestsByUser,
  getAllGasRequestsByDispatch
};
