const { ERROR_MESSAGE } = require('./error.constants');
const HttpStatus = require('http-status-codes');

class BaseError {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }
}

class NotFoundError extends BaseError {
  constructor(
    message = ERROR_MESSAGE.NOT_FOUND,
    errorCode = HttpStatus.NOT_FOUND
  ) {
    super(message, errorCode);
  }
}

module.exports = {
  NotFoundError
};
