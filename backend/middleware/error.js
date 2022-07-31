const ErrorHandler = require("../utils/error_handler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Serve Error";

  //wrong mongodb error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //mongoose duplicate key error
  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid,Try Again`;
    err = new ErrorHandler(message, 400);
  }
  // jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired,Try Again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
