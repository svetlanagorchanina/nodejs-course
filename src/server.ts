import { config } from './common/config';
import { app } from './app';
import { LoggerService } from './services/loggerService';
import { connectToDB } from './db/db.client';
import { UserService } from './modules/users/user.service';
import { InjectorService } from './services/injectorService';
import { USER_SERVICE_IDENTIFIER } from './modules/users/user.constants';
import * as mongoose from 'mongoose';

const logger = new LoggerService();
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
  const userService: UserService = InjectorService.get<UserService>(USER_SERVICE_IDENTIFIER.USER_SERVICE);
  const adminCredential = 'admin';

  await userService.createUser({ name: adminCredential, login: adminCredential, password: adminCredential })
}
