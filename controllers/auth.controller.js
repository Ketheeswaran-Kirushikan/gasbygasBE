const AuthService = require("../services/Auth.service");

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { emailOrAdminName, password } = req.body;

    if (!emailOrAdminName || !password) {
      return ress
        .status(400)
        .json({ error: "Email/Admin Name and Password are required." });
    }

    const { token, user } = await AuthService.loginUser(emailOrAdminName, password);

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Logout Controller
const logoutUser = async (req, res) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(400).json({ error: "Token is required for logout." });
    }

    await AuthService.logoutUser(token);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  logoutUser,
};
