import CustomError from "./custom-api-error.js";

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
