import * as uuid from 'uuid';
import { User } from './user.interface';
import * as mongoose from 'mongoose';

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
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.toResponse = (user: User) => {
  const { id, name, login } = user;

  return { id, name, login };
};

export const UserModel = mongoose.model('User', userSchema);
