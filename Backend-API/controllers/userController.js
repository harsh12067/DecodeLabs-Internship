/**
 * User Controller
 * 
 * The controller acts as a bridge between the routing layer and the data layer (model).
 * It extracts request parameters, calls model functions to perform data operations,
 * and formats the HTTP responses with appropriate status codes and JSON messages.
 * 
 * All async functions are wrapped in try-catch blocks to catch and handle any unforeseen
 * database/file errors, returning a 500 Internal Server Error status code.
 */

const userModel = require('../models/userModel');

/**
 * GET /users
 * Retrieve all users from the data store.
 */
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users
    });
  } catch (error) {
    console.error("Error in getUsers controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching users"
    });
  }
};

/**
 * GET /users/:id
 * Retrieve a single user by their ID.
 */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);
    
    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user
    });
  } catch (error) {
    console.error("Error in getUser controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching user"
    });
  }
};

/**
 * POST /users
 * Add a new user to the data store.
 * Request body has been validated by validation middleware.
 */
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    const newUser = await userModel.createUser({ name, email, age });
    
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });
  } catch (error) {
    console.error("Error in createUser controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating user"
    });
  }
};

/**
 * PUT /users/:id
 * Update an existing user by their ID.
 * Request body has been checked by validation middleware.
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Call model to update user
    const updatedUser = await userModel.updateUser(id, req.body);
    
    // If user to update does not exist, return 404
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    console.error("Error in updateUser controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating user"
    });
  }
};

/**
 * DELETE /users/:id
 * Delete a user by their ID.
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const isDeleted = await userModel.deleteUser(id);
    
    // If user to delete does not exist, return 404
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error in deleteUser controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting user"
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
