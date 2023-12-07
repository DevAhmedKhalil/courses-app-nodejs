module.exports = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((err) => {
      next(err);
    });
  };
};

// This catchAsync pass error to Global middleware if there is an error
