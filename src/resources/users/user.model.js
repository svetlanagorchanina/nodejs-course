const uuid = require('uuid');
const _ = require('lodash');

const DEFAULT_USER = {
  name: 'USER',
  login: 'user',
  password: 'P@55w0rd'
};

class User {
  constructor({
    id = uuid(),
    name = DEFAULT_USER.name,
    login = DEFAULT_USER.login,
    password = DEFAULT_USER.password
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    return _.pick(user, ['id', 'name', 'login']);
  }
}

module.exports = User;
