import { LoggerService } from "../services/loggerService";
import * as _ from 'lodash';
import { InjectorService } from '../services/injectorService';
import { SERVICE_IDENTIFIER } from '../services/services.constants';

const logger: LoggerService = InjectorService.get<LoggerService>(SERVICE_IDENTIFIER.LOGGER_SERVICE);

export function responseLogger(req, res, next) {
    const reqData = _.pick(req, ['query', 'body', 'method', 'originalUrl']);
    logger.logInfo(reqData);

    next();
}
