/**
 * Input Validation Middleware
 * 
 * This middleware validates the incoming request payload (`req.body`) before it
 * reaches the controller. By performing checks here, we ensure that only valid data
 * is processed and stored. If validation fails, we immediately respond with a 400 Bad Request
 * and a clear JSON error message, stopping the request-response cycle.
 */

/**
 * Regex for standard email format validation.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Middleware to validate user creation (POST /users)
 * 
 * Rules:
 * - name: Required, must be a string and not empty.
 * - email: Required, must be a valid email format.
 * - age: Required, must be a positive number (integer > 0).
 */
const validateCreateUser = (req, res, next) => {
  const { name, email, age } = req.body;

  // 1. Validate Name
  if (name === undefined || name === null || (typeof name === 'string' && name.trim() === '')) {
    return res.status(400).json({
      success: false,
      message: "Name is required"
    });
  }
  if (typeof name !== 'string') {
    return res.status(400).json({
      success: false,
      message: "Name must be a text string"
    });
  }

  // 2. Validate Email
  if (!email || (typeof email === 'string' && email.trim() === '')) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  // 3. Validate Age
  if (age === undefined || age === null) {
    return res.status(400).json({
      success: false,
      message: "Age is required"
    });
  }
  const parsedAge = Number(age);
  if (isNaN(parsedAge) || parsedAge <= 0 || !Number.isInteger(parsedAge)) {
    return res.status(400).json({
      success: false,
      message: "Age must be a positive number"
    });
  }

  // If all validation checks pass, proceed to the controller
  next();
};

/**
 * Middleware to validate user update (PUT /users/:id)
 * 
 * Since PUT is used to update an existing resource, we validate any fields
 * provided in the request body. At least one field should be provided to update.
 */
const validateUpdateUser = (req, res, next) => {
  const { name, email, age } = req.body;

  // Ensure body is not empty
  if (name === undefined && email === undefined && age === undefined) {
    return res.status(400).json({
      success: false,
      message: "At least one field (name, email, or age) must be provided for update"
    });
  }

  // 1. Validate Name (if provided)
  if (name !== undefined) {
    if (name === null || (typeof name === 'string' && name.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: "Name cannot be empty"
      });
    }
    if (typeof name !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Name must be a text string"
      });
    }
  }

  // 2. Validate Email (if provided)
  if (email !== undefined) {
    if (email === null || (typeof email === 'string' && email.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: "Email cannot be empty"
      });
    }
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }
  }

  // 3. Validate Age (if provided)
  if (age !== undefined) {
    if (age === null) {
      return res.status(400).json({
        success: false,
        message: "Age cannot be empty"
      });
    }
    const parsedAge = Number(age);
    if (isNaN(parsedAge) || parsedAge <= 0 || !Number.isInteger(parsedAge)) {
      return res.status(400).json({
        success: false,
        message: "Age must be a positive number"
      });
    }
  }

  // If all validation checks pass, proceed to the controller
  next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser
};
