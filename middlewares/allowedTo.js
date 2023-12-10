const appError = require('../utils/appError');
const HST = require('../utils/httpStatusText');

module.exports = (...roles) => {
  // console.log('Roles: ' + roles);
  return (req, res, next) => {
    // Check if Current Logged in User role Is Allowed (verifyToken.js)
    if (!roles.includes(req.currentUser.role)) {
      return next(appError.create('Not Authorized Role', 401, HST.ERROR));
    }
    next();
  };
};
