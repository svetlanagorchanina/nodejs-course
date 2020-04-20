import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as path from 'path';
import * as YAML from 'yamljs';
import { NotFoundError } from './error';
import { InjectorService } from './services/injectorService';

export const router = express.Router();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

InjectorService.init();

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/users', require('./modules/users/user.router'));
router.use('/boards', require('./modules/board/board.router'));
router.use('/boards/:boardId/tasks', require('./modules/task/task.router'));
router.use('*', () => {
  throw new NotFoundError('Page not found');
});
