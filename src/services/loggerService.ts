import * as winston from "winston";
import { withDate } from '../decorators/withDate';

export class LoggerService {
    private logger;
    private readonly LOG_DIR = 'log';
    private readonly INFO_LOG_FILE_NAME = 'info.log';
    private readonly ERROR_LOG_FILE_NAME = 'error.log';

    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ dirname: this.LOG_DIR, filename: this.INFO_LOG_FILE_NAME, level: 'info' }),
                new winston.transports.File({ dirname: this.LOG_DIR, filename: this.ERROR_LOG_FILE_NAME, level: 'error' }),
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
