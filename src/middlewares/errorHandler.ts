import { BaseError, ValidationError } from '../error';
import * as HttpStatus from "http-status-codes";
import { LoggerService } from '../services/loggerService';
import * as mongoose from 'mongoose';

export function errorHandler(err, req, res, next) {
    const logger = new LoggerService();

    if (err instanceof BaseError) {
        sendErrorResponse(res, logger, err);

        return;
    }

    if (err instanceof mongoose.Error.ValidationError) {
        const validationError = new ValidationError(err.message);
        sendErrorResponse(res, logger, validationError);

        return;
    }

    logger.logError(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
}

function sendErrorResponse(res, logger: LoggerService, error: BaseError) {
    logger.logInfo(error);
    res.status(error.code).json(error);
}
