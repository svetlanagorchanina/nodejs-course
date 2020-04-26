import 'reflect-metadata';
import { InjectorService } from './services/injectorService';
import * as express from 'express';
import { responseLogger } from "./middlewares/responseLogger";
import { errorHandler } from "./middlewares/errorHandler";

InjectorService.init();

export const app = express();

app.use(express.json());
app.use(responseLogger);
app.use('/', require('./router'));
app.use(errorHandler);
