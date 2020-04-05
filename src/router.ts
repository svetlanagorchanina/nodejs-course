import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as path from 'path';
import * as YAML from 'yamljs';

export const router = express.Router();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/users', require('./resources/users/user.router'));
router.use('/boards', require('./resources/board/board.router'));
