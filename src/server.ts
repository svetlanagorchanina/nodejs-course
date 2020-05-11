import { config } from './config/config';
import { app } from './app';
import { LoggerService } from './services/logger/loggerService';
import { connectToDB } from './db/db.client';
import { UserService } from './services/user/user.service';
import { InjectorService } from './services/injector/injectorService';
import * as mongoose from 'mongoose';
import { SERVICE_IDENTIFIER, USER_IDENTIFIER } from './services/injector/injectorService.constants';

const logger: LoggerService = InjectorService.get<LoggerService>(SERVICE_IDENTIFIER.LOGGER_SERVICE);
process.on('uncaughtException', error => logger.logError(error));
process.on('unhandledRejection', error => logger.logError(error));

(async function() {
  try {
    if (config.isDBConnection) {
      await connectToDB();
      await mongoose.connection.dropDatabase();
      await addAdminUser();
    }

    app.listen(config.PORT, () =>
      console.log(`App is running on http://localhost:${config.PORT}`)
    );
  } catch(error) {
    logger.logError(error);
    process.exit(1)
  }
})();

async function addAdminUser() {
  const userService: UserService = InjectorService.get<UserService>(USER_IDENTIFIER.USER_SERVICE);
  const adminCredential = 'admin';

  await userService.createUser({ name: adminCredential, login: adminCredential, password: adminCredential })
}
