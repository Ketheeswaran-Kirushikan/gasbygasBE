// Importing required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/DB.Config"); // Importing DB configuration

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for cross-origin requests

// Connect to Database
connectDB();

// Example user route
const userRoutes = require("./routes/user.routes");
const dispatchRoutes = require("./routes/dipatch.routes");
const loginRoutes = require("./routes/Auth.routes");
const outletRoutes = require("./routes/outlet.routes");
const gasRequestRoutes = require("./routes/gasrequest.routes");
app.use("/api/users", userRoutes); // Use routes for user management
app.use("/api/auth", loginRoutes); // Use routes for login management
app.use("/api/dispatch", dispatchRoutes); // Use routes for dispatch management
app.use("/api/outlet",outletRoutes)
app.use("/api/gasrequest", gasRequestRoutes); // Use routes for gas request management

// Start the server
const PORT = process.env.URL_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
