import { UserService } from './user.service';
import * as express from 'express';
import { UserModel } from './user.model';
import * as HttpStatus from 'http-status-codes';
import { UserModule } from './user.module';
import { USER_SERVICE_IDENTIFIER } from './user.constants';
import { safeHandler } from "../../decorators/safeHandler";
import { User } from "./user.interface";

UserModule.init();
const router = express.Router();
const userService: UserService = UserModule.get<UserService>(USER_SERVICE_IDENTIFIER.USER_SERVICE);

router.route('/')
  .get(safeHandler.bind(null, async (req, res) => {
    const users: User[] = await userService.getAll();

    res.status(HttpStatus.OK).json(users.map(UserModel.toResponse));
  }))
  .post(safeHandler.bind(null, async (req, res) => {
    const user: User = await userService.createUser(req.body);

    res.status(HttpStatus.OK).json(UserModel.toResponse(user));
  }));

router.route('/:id')
  .get(safeHandler.bind(null, async (req, res) => {
    const user: User = await userService.getUser(req.params.id);

    res.status(HttpStatus.OK).json(UserModel.toResponse(user));
  }))
  .put(safeHandler.bind(null, async (req, res) => {
    const user: User = await userService.updateUser(req.params.id, req.body);

    res.status(HttpStatus.OK).json(UserModel.toResponse(user));
  }))
  .delete(safeHandler.bind(null, async (req, res) => {
    await userService.deleteUser(req.params.id);

    res.status(HttpStatus.NO_CONTENT).send();
  }));

module.exports = router;
