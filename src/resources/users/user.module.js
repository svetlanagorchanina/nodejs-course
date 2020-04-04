const inversify = require('inversify');
const { USER_REPOSITORY, USER_SERVICE } = require('./user.constants');
const UserMemoryRepository = require('./user.memory.repository');
const UserService = require('./user.service');

class UserModule {
  static init() {
    UserModule.container = new inversify.Container();
    UserModule.container.bind(USER_REPOSITORY).to(UserMemoryRepository);
    UserModule.container.bind(USER_SERVICE).to(UserService);
  }

  static get(serviceType) {
    return UserModule.container.get(serviceType);
  }
}

module.exports = UserModule;
