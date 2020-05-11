import { UserService } from '../services/user/user.service';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { safeHandler } from "../decorators/safeHandler";
import { User } from "../models/user/user.interface";
import { InjectorService } from '../services/injector/injectorService';
import { USER_IDENTIFIER } from '../services/injector/injectorService.constants';

const router = express.Router();
const userService: UserService = InjectorService.get<UserService>(USER_IDENTIFIER.USER_SERVICE);

router.route('/')
  .get(safeHandler.bind(null, async (req, res) => {
    const users: User[] = await userService.getAll();

    res.status(HttpStatus.OK).json(users);
  }))
  .post(safeHandler.bind(null, async (req, res) => {
    const user: User = await userService.createUser(req.body);

    res.status(HttpStatus.OK).json(user);
  }));

router.route('/:id')
  .get(safeHandler.bind(null, async (req, res) => {
    const user: User = await userService.getUserById(req.params.id);

    res.status(HttpStatus.OK).json(user);
  }))
  .put(safeHandler.bind(null, async (req, res) => {
    const user: User = await userService.updateUser(req.params.id, req.body);

    res.status(HttpStatus.OK).json(user);
  }))
  .delete(safeHandler.bind(null, async (req, res) => {
    await userService.deleteUser(req.params.id);

    res.status(HttpStatus.NO_CONTENT).send();
  }));

module.exports = router;
