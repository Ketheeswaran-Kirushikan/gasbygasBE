const Outlet = require("../models/outlet.model");
const cloudinary = require("../utils/cloudinary.utils");
const bcrypt = require("bcryptjs");
const sendGrid = require("@sendgrid/mail");
const axios = require("axios");

// Set SendGrid API Key
sendGrid.setApiKey(process.env.SENDGRID_KEY);

// Geocoding function using Nominatim
const getLatLongFromAddress = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data && data.length > 0) {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
      return { latitude, longitude };
    } else {
      throw new Error("No results found for the given address.");
    }
  } catch (error) {
    console.error("Geocoding Error:", error.message);
    throw new Error("Geocoding failed. Please provide a valid address.");
  }
};

// Create Outlet
const createOutlet = async (data, files) => {
  try {
    let imageUrl = "";
    let certificateUrl = "";

    // Upload image and certificate to Cloudinary if files are provided
    if (files?.image) {
      const imageResult = await cloudinary.uploader.upload(files.image[0].path);
      imageUrl = imageResult.secure_url;
    }

    if (files?.certificate) {
      const certificateResult = await cloudinary.uploader.upload(
        files.certificate[0].path
      );
      certificateUrl = certificateResult.secure_url;
    }

    // Get latitude and longitude from the address
    const { latitude, longitude } = await getLatLongFromAddress(data.outletAddress);

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const outletData = {
      ...data,
      password: hashedPassword, // Store the hashed password
      image: imageUrl,
      certificate: certificateUrl,
      latitude,
      longitude,
    };

    // Save the outlet record in the database
    const newOutlet = await Outlet.create(outletData);

    // Send email with the credentials
    const emailContent = `
      <h2>Welcome to Gas Delivery System</h2>
      <p>Dear ${newOutlet.outletName},</p>
      <p>Your account has been created successfully. Please find your login credentials below:</p>
      <ul>
        <li><strong>Email:</strong> ${newOutlet.emailAddress}</li>
        <li><strong>Password:</strong> ${data.password}</li>
      </ul>
      <p>Use these credentials to log in to your account.</p>
      <p>Thank you for joining us!</p>
    `;

    const msg = {
      to: newOutlet.emailAddress,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: "Welcome to Gas Delivery System",
      html: emailContent,
    };

    await sendGrid.send(msg);

    // Return the new outlet without the hashed password
    return {
      outlet: {
        id: newOutlet._id,
        outletName: newOutlet.outletName,
        emailAddress: newOutlet.emailAddress,
        createdAt: newOutlet.createdAt,
      },
    };
  } catch (error) {
    console.error("Error in createOutlet:", error.message);
    throw new Error(error.message);
  }
};

// Update Outlet by ID
const updateOutletById = async (id, data, files) => {
  try {
    let updatedData = { ...data };

    // Check if address is updated and calculate new latitude/longitude
    if (data.outletAddress) {
      const { latitude, longitude } = await getLatLongFromAddress(data.outletAddress);
      updatedData.latitude = latitude;
      updatedData.longitude = longitude;
    }

    // Check if a new password is provided, and hash it
    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }

    if (files?.image) {
      const imageResult = await cloudinary.uploader.upload(files.image[0].path);
      updatedData.image = imageResult.secure_url;
    }

    if (files?.certificate) {
      const certificateResult = await cloudinary.uploader.upload(
        files.certificate[0].path
      );
      updatedData.certificate = certificateResult.secure_url;
    }

    // Update the outlet in the database
    return await Outlet.findByIdAndUpdate(id, updatedData, { new: true });
  } catch (error) {
    console.error("Error in updateOutletById:", error.message);
    throw new Error(error.message);
  }
};

// Delete Outlet by ID
const deleteOutletById = async (id) => {
  return await Outlet.findByIdAndDelete(id);
};

// Get Outlet by ID
const getOutletById = async (id) => {
  return await Outlet.findById(id);
};

// Get All Outlets
const getAllOutlets = async () => {
  return await Outlet.find();
};

module.exports = {
  createOutlet,
  updateOutletById,
  deleteOutletById,
  getOutletById,
  getAllOutlets,
};
