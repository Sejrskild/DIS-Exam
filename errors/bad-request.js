import CustomError from "./custom-api-error.js";

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;