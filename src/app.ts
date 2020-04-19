import 'reflect-metadata';
import * as express from 'express';
import { router } from './router';
import { responseLogger } from "./middlewares/responseLogger";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();

app.use(express.json());
app.use(responseLogger);
app.use('/', router);
app.use(errorHandler);
