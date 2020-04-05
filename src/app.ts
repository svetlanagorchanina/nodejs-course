import 'reflect-metadata';
import * as express from 'express';
import { router } from './router';

export const app = express();

app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.code).json(err);

    return;
  }

  next();
});
