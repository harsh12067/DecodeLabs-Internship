/**
 * User Routes
 * 
 * This file maps API endpoints (URLs + HTTP methods) to specific handler functions
 * inside the user controller. Additionally, it applies input validation middleware
 * to routes that accept payloads (POST and PUT), ensuring invalid requests are
 * intercepted early.
 */

const express = require('express');
const router = express.Router();

// Import controllers
const userController = require('../controllers/userController');

// Import input validation middleware
const { validateCreateUser, validateUpdateUser } = require('../middleware/validation');

/**
 * Route: GET /users
 * Action: Retrieve all users
 */
router.get('/', userController.getUsers);

/**
 * Route: GET /users/:id
 * Action: Retrieve a single user by ID
 */
router.get('/:id', userController.getUser);

/**
 * Route: POST /users
 * Action: Create a new user (with validation middleware)
 */
router.post('/', validateCreateUser, userController.createUser);

/**
 * Route: PUT /users/:id
 * Action: Update an existing user by ID (with validation middleware)
 */
router.put('/:id', validateUpdateUser, userController.updateUser);

/**
 * Route: DELETE /users/:id
 * Action: Delete a user by ID
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
