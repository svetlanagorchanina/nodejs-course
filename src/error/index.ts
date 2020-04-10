import { ERROR_MESSAGE } from './error.constants';
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
    message = ERROR_MESSAGE.NOT_FOUND,
    errorCode = HttpStatus.NOT_FOUND
  ) {
    super(message, errorCode);
  }
}
