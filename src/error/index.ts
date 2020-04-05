import { ERROR_MESSAGE } from './error.constants';
import * as HttpStatus from 'http-status-codes';

class BaseError {
  message: string;
  code: number;

  constructor(message: string, code: number) {
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
