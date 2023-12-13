const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const HST = require('../utils/httpStatusText');

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    const err = AppError.create('Token not provided', 401, HST.ERROR);
    return next(err);
  }

  //# Verify the token
  //@ Way one
  try {
    // Verify the token => decoded Token = Current User
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log('Decoded Token = Current User:', currentUser);

    // Attach the decoded/current user information to the request object
    req.currentUser = currentUser;

    next();
  } catch (e) {
    const err = AppError.create('Invalid Token!', 401, HST.ERROR);
    return next(err);
  }

  //@ Way two
  // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
  //   if (err) {
  //     const error = AppError.create(
  //       'Token verification failed',
  //       401,
  //       HST.ERROR
  //     );
  //     return next(error);
  //   }

  //   // Attach the decoded user information to the request object
  //   req.user = decoded;
  //   console.log('Decoded: ', decoded);
  //   next();
  // });
};

module.exports = verifyToken;
