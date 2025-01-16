const UserService = require("../services/user.service");

// Create User
const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body, req.file);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserService.updateUserById(id, req.body, req.file);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserService.deleteUserById(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers
};
