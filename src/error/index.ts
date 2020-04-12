import * as HttpStatus from 'http-status-codes';

export class BaseError extends Error {
  message: string;
  code: number;

  constructor(message: string, code: number) {
    super();
    this.message = message;
    this.code = code;
  }
}

export class NotFoundError extends BaseError {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    errorCode = HttpStatus.NOT_FOUND
  ) {
    super(message, errorCode);
  }
}
