const errorMiddlewar = (err, req, res, next) => {
  err.message = err.message || "Internal Server Errors";
  err.statusCode = err.statusCode || 500;
  //   console.log(err);
  /**--------------MongoDb Errors------- */
  if (err.code === 11000) {
    err.message = "duplicate Key Errors";
    err.statusCode = 400;
  }
  res.status(err.statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export default errorMiddlewar;
