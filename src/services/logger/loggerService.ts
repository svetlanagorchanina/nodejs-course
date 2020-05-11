import * as winston from "winston";
import { withDate } from '../../decorators/withDate';
import { injectable } from 'inversify';
import { ERROR_LOG_FILE_NAME, INFO_LOG_FILE_NAME, LOG_DIR } from './loggerService.constants';

@injectable()
export class LoggerService {
    private logger;

    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ dirname: LOG_DIR, filename: INFO_LOG_FILE_NAME, level: 'info' }),
                new winston.transports.File({ dirname: LOG_DIR, filename: ERROR_LOG_FILE_NAME, level: 'error' }),
                new winston.transports.Console({ level: 'error' }),
            ],
        });
    }

    @withDate
    logInfo(data) {
        this.logger.log('info', 'API request', data);
    }

    @withDate
    logError(error) {
        this.logger.log('error', '' , error);
    }
}
