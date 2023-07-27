const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.message || 'error';

  res.status(statusCode).json({
    status: status,
    message: message,
    error: err,
    stack: err.errStack,
  });
};

sendErrorProd = (err, res) => {
  if (!err.isOperational) {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleCastError = err => {
  return new AppError(`Invalid ${err.path}: ${err.value} `, 400);
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error;

    // MongoDB CastError
    if (err.name === 'CastError') error = handleCastError(err);

    sendErrorProd(error, res);
  }
};
