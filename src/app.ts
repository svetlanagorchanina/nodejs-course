import 'reflect-metadata';
import * as express from 'express';
import { router } from './router';
import { responseLogger } from "./middlewares/responseLogger";
import { errorLogger } from "./middlewares/errorLogger";
import { errorHandler } from "./middlewares/errorHandler";
import { LoggerService } from "./services/loggerService";

export const app = express();

app.use(express.json());
app.use(responseLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errorHandler);

const logger = new LoggerService();
process.on('uncaughtException', err => logger.logError(err));
process.on('unhandledRejection', err => logger.logError(err));
