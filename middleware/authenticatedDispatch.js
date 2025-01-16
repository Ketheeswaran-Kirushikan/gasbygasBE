const jwt = require("jsonwebtoken");
const Dispatch = require("../models/dispatch.model");

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

const authenticateDispatch = async (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access token is missing or invalid." });
    }

    const token = authHeader.split(" ")[1];

    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Check if the token's userType is 'dispatch'
    if (decoded.userType !== "dispatch") {
      return res.status(403).json({ error: "Unauthorized access for non-dispatch users." });
    }

    // Check if the dispatch user exists in the database
    const dispatch = await Dispatch.findById(decoded.id);

    if (!dispatch) {
      return res.status(403).json({ error: "Dispatch user not found." });
    }

    // Attach the dispatch user to the request for further use
    req.user = dispatch;
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateDispatch;
