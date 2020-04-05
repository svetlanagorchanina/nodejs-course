require('reflect-metadata');
const express = require('express');
const router = require('./router');
const app = express();

app.use(express.json());
app.use('/', router);
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.code).json(err);

    return;
  }

  next();
});

module.exports = app;
