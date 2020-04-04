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

router.get('/:id', async (req, res) => {
  const user = await userService.getUser(req.params.id);

  res.status(HttpStatus.OK).json(User.toResponse(user));
});

router.post('/', async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(HttpStatus.OK).json(User.toResponse(user));
});

router.put('/:id', async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  console.log(user);

  res.status(HttpStatus.OK).json(user);
});

router.delete('/:id', async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(HttpStatus.NO_CONTENT).send();
});

module.exports = router;
