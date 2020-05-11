import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as path from 'path';
import * as YAML from 'yamljs';
import { NotFoundError } from '../error';
import { authorize } from '../middlewares/authorize';

const router = express.Router();

const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));

router.use(authorize);

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/login', require('./login.router'));
router.use('/users', require('./user.router'));
router.use('/boards', require('./board.router'));
router.use('/boards/:boardId/tasks', require('./task.router'));
router.use('*', () => {
  throw new NotFoundError('Page not found');
});

module.exports = router;
