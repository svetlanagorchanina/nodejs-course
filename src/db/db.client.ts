import * as mongoose from 'mongoose';
import { config } from '../config/config';

export function connectToDB(): Promise<any> {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.MONGO_CONNECTION_STRING, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;

    db.on('error', reject);
    db.once('open', resolve);
  });
}
