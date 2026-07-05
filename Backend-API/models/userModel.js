/**
 * User Model
 * 
 * This model acts as the data access layer for our application. Since we are not using a
 * database, we simulate database operations by reading and writing to a local JSON file 
 * (`data/users.json`) using Node.js's asynchronous file system module (`fs/promises`).
 */

const fs = require('fs').promises;
const path = require('path');

// Resolve the absolute path to users.json relative to this file's location
const filePath = path.join(__dirname, '../data/users.json');

/**
 * Helper function to read users from the JSON file.
 * Returns an empty array if the file does not exist or has invalid JSON.
 * 
 * @returns {Promise<Array>} Array of user objects
 */
const getAllUsers = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file is not found (ENOENT), return an empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

/**
 * Helper function to save users back to the JSON file.
 * 
 * @param {Array} users - The complete array of user objects to persist
 */
const saveAllUsers = async (users) => {
  // Save with 2 spaces formatting for readability in the JSON file
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');
};

/**
 * Find a user by their unique ID.
 * 
 * @param {number|string} id - The ID of the user to find
 * @returns {Promise<Object|null>} The found user object, or null
 */
const getUserById = async (id) => {
  const users = await getAllUsers();
  // Ensure we compare using numbers
  const user = users.find(u => u.id === Number(id));
  return user || null;
};

/**
 * Create and persist a new user.
 * Auto-increments the ID based on the highest existing ID.
 * 
 * @param {Object} userData - Contains name, email, and age
 * @returns {Promise<Object>} The newly created user object
 */
const createUser = async (userData) => {
  const users = await getAllUsers();
  
  // Auto-increment: Find the maximum ID in the array, add 1. Default to 1 if empty.
  const maxId = users.reduce((max, u) => (u.id > max ? u.id : max), 0);
  const newId = maxId + 1;
  
  const newUser = {
    id: newId,
    name: userData.name,
    email: userData.email,
    age: Number(userData.age)
  };
  
  users.push(newUser);
  await saveAllUsers(users);
  return newUser;
};

/**
 * Update an existing user's details.
 * 
 * @param {number|string} id - The ID of the user to update
 * @param {Object} updateData - New values for name, email, or age
 * @returns {Promise<Object|null>} The updated user object, or null if user not found
 */
const updateUser = async (id, updateData) => {
  const users = await getAllUsers();
  const index = users.findIndex(u => u.id === Number(id));
  
  if (index === -1) {
    return null; // User not found
  }
  
  // Merge existing details with updated fields
  users[index] = {
    ...users[index],
    name: updateData.name !== undefined ? updateData.name : users[index].name,
    email: updateData.email !== undefined ? updateData.email : users[index].email,
    age: updateData.age !== undefined ? Number(updateData.age) : users[index].age
  };
  
  await saveAllUsers(users);
  return users[index];
};

/**
 * Delete a user by their unique ID.
 * 
 * @param {number|string} id - The ID of the user to delete
 * @returns {Promise<boolean>} True if the user was deleted, false if user not found
 */
const deleteUser = async (id) => {
  const users = await getAllUsers();
  const index = users.findIndex(u => u.id === Number(id));
  
  if (index === -1) {
    return false; // User not found
  }
  
  // Remove the user at the found index
  users.splice(index, 1);
  await saveAllUsers(users);
  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
