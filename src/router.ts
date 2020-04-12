import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as path from 'path';
import * as YAML from 'yamljs';
import { setBoardParams } from './middlewares/setBoardParams';
import { NotFoundError } from './error';

export const router = express.Router();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/users', require('./modules/users/user.router'));
router.use('/boards', require('./modules/board/board.router'));
router.use('/boards/:id/tasks', setBoardParams, require('./modules/task/task.router'));
router.use('*', () => {
  throw new NotFoundError('Page not found');
});
