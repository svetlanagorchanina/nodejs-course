const { USER_REPOSITORY } = require('./user.constants');
const inversify = require('inversify');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAll() {
    return this.userRepository.getAll();
  }
}
inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.inject(USER_REPOSITORY), UserService, 0);

module.exports = UserService;
