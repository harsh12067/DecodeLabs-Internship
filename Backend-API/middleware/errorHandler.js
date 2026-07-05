/**
 * Global Error Handling Middleware
 * 
 * This middleware intercepts any unhandled errors thrown during the execution of routes,
 * controllers, or other middlewares. It logs the error stack trace to the console for
 * developer debugging and returns a standard JSON error response with a 500 status code
 * to prevent the server from crashing.
 */
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Application Error:", err.stack || err.message || err);

  // Return a production-ready, standardized error JSON
  res.status(500).json({
    success: false,
    message: "An internal server error occurred on the server"
  });
};

module.exports = errorHandler;
