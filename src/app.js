require('reflect-metadata');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const router = require('./router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', router);
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.code).json(err);

    return;
  }

  next();
});

module.exports = app;
