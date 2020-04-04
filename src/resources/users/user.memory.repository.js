const inversify = require('inversify');

class UserMemoryRepository {
  getAll() {
    return [];
  }
}
inversify.decorate(inversify.injectable(), UserMemoryRepository);

module.exports = UserMemoryRepository;
