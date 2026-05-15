const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract error messages
    const message = errors.array().map(err => err.msg).join(', ');
    return next(new ErrorResponse(message, 400));
  }
  next();
};
