import * as winston from "winston";

const LOG_FILE_NAME = 'info.log';

export class LoggerService {
    private logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: LOG_FILE_NAME }),
                new winston.transports.Console(),
            ]
        });
    }

    logInfo(data) {
        this.logger.log('info', 'API request', data);
    }

    logError(error) {
        this.logger.log('error', '' , error);
    }
}
