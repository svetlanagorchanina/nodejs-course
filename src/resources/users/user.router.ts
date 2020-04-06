import { UserService } from './user.service';
import * as express from 'express';
import { UserModel } from './user.model';
import * as HttpStatus from 'http-status-codes';
import { UserModule } from './user.module';
import { USER_SERVICE_IDENTIFIER } from './user.constants';
import { TaskService } from '../task/task.service';
import { TaskModule } from '../task/task.module';
import { TASK_SERVICE_IDENTIFIER } from '../task/task.constants';
import { Task } from '../task/task.interface';

const router = express.Router();
UserModule.init();
TaskModule.init();

const userService: UserService = UserModule.get<UserService>(USER_SERVICE_IDENTIFIER.USER_SERVICE);
const taskService: TaskService = TaskModule.get<TaskService>(TASK_SERVICE_IDENTIFIER.TASK_SERVICE);

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.status(HttpStatus.OK).json(users.map(UserModel.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);

    res.status(HttpStatus.OK).json(UserModel.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(HttpStatus.OK).json(UserModel.toResponse(user));
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
    await taskService.updateUserTasks(this.params.id, { userId: null } as Task);

    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
