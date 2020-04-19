import { BaseError } from "../error";
import * as HttpStatus from "http-status-codes";
import { LoggerService } from '../services/loggerService';

export function errorHandler(err, req, res, next) {
    const logger = new LoggerService();

    if (err instanceof BaseError) {
        logger.logInfo(err);
        res.status(err.code).json(err);

        return;
    }

    logger.logError(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
}
