const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const router = express.Router();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/users', require('./resources/users/user.router'));

module.exports = router;
