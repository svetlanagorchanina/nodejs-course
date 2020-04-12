import * as uuid from 'uuid';
import * as _ from 'lodash';
import { User } from './user.interface';

const DEFAULT_USER = {
  name: 'USER',
  login: 'user',
  password: 'P@55w0rd'
};

export class UserModel {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor(user: User = {} as User) {
    this.id = uuid();

    ['name', 'login', 'password'].forEach((property: string) => {
      this[property] = user[property] || DEFAULT_USER[property];
    });
  }

  static toResponse(user: User) {
    return _.pick(user, ['id', 'name', 'login']);
  }
}
