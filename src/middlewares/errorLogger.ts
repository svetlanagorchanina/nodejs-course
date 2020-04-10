import { LoggerService } from "../services/loggerService";

export function errorLogger(err, req, res, next) {
    const logger = new LoggerService();
    logger.logError(err);

    next(err);
}
