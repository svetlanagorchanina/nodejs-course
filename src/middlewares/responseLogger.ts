import { LoggerService } from "../services/loggerService";
import * as _ from 'lodash';

export function responseLogger(req, res, next) {
    const logger = new LoggerService();
    const reqData = _.pick(req, ['query', 'body', 'method', 'originalUrl']);
    logger.logInfo(reqData);

    next();
}
