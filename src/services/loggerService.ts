import * as winston from "winston";
import { config } from "../common/config";

const LOG_FILE_NAME = 'info.log';

export class LoggerService {
    private logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: LOG_FILE_NAME }),
                !config.isLocalHost && new winston.transports.Console(),
            ].filter(Boolean),
        });
    }

    logInfo(data) {
        this.logger.log('info', 'API request', data);
    }

    logError(error) {
        this.logger.log('error', '' , error);
    }
}
