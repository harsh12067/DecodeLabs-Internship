/**
 * Express Server Entry Point (server.js)
 * 
 * This is the root file of our backend API application. It loads configurations,
 * sets up Express middleware, registers the routes, sets up global error handling,
 * and starts the HTTP server on a specified port.
 */

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

// Initialize the Express application
const app = express();

// Define the port from environment variables, or default to 5000
const PORT = process.env.PORT || 5000;

/**
 * Configure Middleware
 * Middleware functions are executed sequentially as requests travel to our controllers.
 */

// express.json() is built-in middleware to parse incoming requests with JSON payloads
app.use(express.json());

// express.urlencoded() parses incoming requests with URL-encoded payloads (e.g. form submissions)
// 'extended: true' allows parsing of nested objects and arrays
app.use(express.urlencoded({ extended: true }));

/**
 * Register Routes
 * 
 * We mount our userRoutes at the '/users' path. This means all routes declared in 
 * `userRoutes.js` will automatically be prefixed with `/users` (e.g., POST `/users`).
 */
app.use('/users', userRoutes);

// A simple default route for checking the API status
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Backend API. The server is running smoothly."
  });
});

/**
 * 404 Route Not Found Fallback Handler
 * 
 * If a request matches none of our registered routes, it reaches here, and we return
 * a clean 404 response instead of the default HTML error page.
 */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Requested API endpoint not found"
  });
});

/**
 * Global Error Handling Middleware
 */
app.use(errorHandler);

// Start the Express server to listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
