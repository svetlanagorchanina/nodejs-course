import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as path from 'path';
import * as YAML from 'yamljs';
import { NotFoundError } from './error';
import { authorize } from './middlewares/authorize';

const router = express.Router();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/login', require('./modules/login/login.router'));
router.use('/users', authorize, require('./modules/users/user.router'));
router.use('/boards', authorize, require('./modules/board/board.router'));
router.use('/boards/:boardId/tasks', authorize, require('./modules/task/task.router'));
router.use('*', () => {
  throw new NotFoundError('Page not found');
});

module.exports = router;
