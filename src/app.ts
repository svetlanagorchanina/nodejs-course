import 'reflect-metadata';
import { InjectorService } from './services/injector/injectorService';
import * as express from 'express';

InjectorService.init();

import { responseLogger } from "./middlewares/responseLogger";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();

app.use(express.json());
app.use(responseLogger);
app.use('/', require('./routers'));
app.use(errorHandler);
