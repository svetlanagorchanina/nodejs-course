import { config } from './common/config';
import { app } from './app';
import { LoggerService } from './services/loggerService';

const logger = new LoggerService();
process.on('uncaughtException', err => logger.logError(err));
process.on('unhandledRejection', err => logger.logError(err));

app.listen(config.PORT, () =>
  console.log(`App is running on http://localhost:${config.PORT}`)
);
