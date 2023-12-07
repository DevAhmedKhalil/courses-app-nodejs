class AppError extends Error {
  constructor() {
    super();
  }

  create(message, statusCode, statusText) {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}

module.exports = new AppError();

// U will use by this way => AppError.create("bla bla bla", 404, "success")
