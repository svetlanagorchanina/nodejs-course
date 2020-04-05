const inversify = require('inversify');
const _ = require('lodash');
const { NotFoundError } = require('../../error');

class UserMemoryRepository {
  constructor() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  getUser(userId) {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  addUser(user) {
    this.users.push(user);

    return user;
  }

  updateUser(userId, updatedUser) {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return Object.assign(user, updatedUser);
  }

  deleteUser(userId) {
    const removedUsers = _.remove(this.users, ({ id }) => id === userId);

    if (!removedUsers.length) {
      throw new NotFoundError('User not found');
    }

    return removedUsers;
  }
}
inversify.decorate(inversify.injectable(), UserMemoryRepository);

module.exports = UserMemoryRepository;
