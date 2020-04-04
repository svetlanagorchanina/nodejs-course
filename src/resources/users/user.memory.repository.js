const inversify = require('inversify');
const _ = require('lodash');

class UserMemoryRepository {
  constructor() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  addUser(user) {
    this.users.push(user);

    return user;
  }

  updateUser(userId, updatedUser) {
    const user = this.users.find(({ id }) => id === userId);
    return Object.assign(user, updatedUser);
  }

  deleteUser(id) {
    return _.remove(this.users, user => user.id === id);
  }
}
inversify.decorate(inversify.injectable(), UserMemoryRepository);

module.exports = UserMemoryRepository;
