import { config } from './common/config';
import { app } from './app';
import { LoggerService } from './services/loggerService';
import { connectToDB } from './db/db.client';

const logger = new LoggerService();
process.on('uncaughtException', error => logger.logError(error));
process.on('unhandledRejection', error => logger.logError(error));

(async function() {
  try {
    if (config.isDBConnection) {
      await connectToDB();
    }

    app.listen(config.PORT, () =>
      console.log(`App is running on http://localhost:${config.PORT}`)
    );
  } catch(error) {
    logger.logError(error);
    process.exit(1)
  }
})();
