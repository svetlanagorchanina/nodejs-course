const router = require('express').Router();
const User = require('./user.model');
const HttpStatus = require('http-status-codes');
const UserModule = require('./user.module');
const { USER_SERVICE } = require('./user.constants');

UserModule.init();

const userService = UserModule.get(USER_SERVICE);

router.get('/', async (req, res) => {
  const users = await userService.getAll();

  res.status(HttpStatus.OK).json(users.map(User.toResponse));
});

module.exports = router;
