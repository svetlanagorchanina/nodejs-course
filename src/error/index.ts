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

export class ValidationError extends BaseError {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    errorCode = HttpStatus.BAD_REQUEST
  ) {
    super(message, errorCode);
  }
}

export class LoginFailError extends BaseError {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
    errorCode = HttpStatus.UNAUTHORIZED
  ) {
    super(message, errorCode);
  }
}

export class ForbiddenError extends BaseError {
  constructor(
    message = HttpStatus.getStatusText(HttpStatus.FORBIDDEN),
    errorCode = HttpStatus.FORBIDDEN
  ) {
    super(message, errorCode);
  }
}
