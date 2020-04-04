const { USER_REPOSITORY } = require('./user.constants');
const inversify = require('inversify');
const User = require('./user.model');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAll() {
    return this.userRepository.getAll();
  }

  getUser(id) {
    return this.userRepository.getUser(id);
  }

  createUser(user) {
    const newUser = new User(user);

    return this.userRepository.addUser(newUser);
  }

  updateUser(id, user) {
    return this.userRepository.updateUser(id, user);
  }

  deleteUser(id) {
    return this.userRepository.deleteUser(id);
  }
}
inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.inject(USER_REPOSITORY), UserService, 0);

module.exports = UserService;
