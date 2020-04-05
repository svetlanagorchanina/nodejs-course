const router = require('express').Router();
const User = require('./user.model');
const HttpStatus = require('http-status-codes');
const UserModule = require('./user.module');
const { USER_SERVICE } = require('./user.constants');

UserModule.init();

const userService = UserModule.get(USER_SERVICE);

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.status(HttpStatus.OK).json(users.map(User.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);

    res.status(HttpStatus.OK).json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(HttpStatus.OK).json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    res.status(HttpStatus.OK).json(user);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);

    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
