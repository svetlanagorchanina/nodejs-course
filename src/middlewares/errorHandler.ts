import { BaseError, ValidationError } from '../error';
import * as HttpStatus from "http-status-codes";
import { LoggerService } from '../services/logger/loggerService';
import * as mongoose from 'mongoose';
import { InjectorService } from '../services/injector/injectorService';
import { SERVICE_IDENTIFIER } from '../services/injector/injectorService.constants';

const logger: LoggerService = InjectorService.get<LoggerService>(SERVICE_IDENTIFIER.LOGGER_SERVICE);

export function errorHandler(err, req, res, next) {
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
