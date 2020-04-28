import * as uuid from 'uuid';
import { User } from './user.interface';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { AuthService } from '../../services/authService';
import { SERVICE_IDENTIFIER } from '../../services/services.constants';
import { InjectorService } from '../../services/injectorService';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  login: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const USER_RESPONSE_FIELDS = ['id', 'name', 'login'];

userSchema.methods.toJSON = function() {
  const user: User = this;

  return _.pick(user, USER_RESPONSE_FIELDS);
};

userSchema.pre('save', async function (next) {
  const user = this;
  const authService: AuthService = InjectorService.get<AuthService>(SERVICE_IDENTIFIER.AUTH_SERVICE);

  if (user.isModified('password')) {
    user.password = await authService.hashPassword(user.password);
  }

  next();
});

export const UserModel = mongoose.model('User', userSchema);
