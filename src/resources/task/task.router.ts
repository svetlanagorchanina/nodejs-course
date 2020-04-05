import { TaskService } from './task.service';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { TaskModule } from './task.module';
import { TASK_SERVICE_IDENTIFIER } from './task.constants';

const router = express.Router();
TaskModule.init();

const taskService: TaskService = TaskModule.get<TaskService>(TASK_SERVICE_IDENTIFIER.TASK_SERVICE);

router.get('/', async (req, res, next) => {
  try {
    const tasks = await taskService.getAll(req.boardParams.id);

    res.status(HttpStatus.OK).json(tasks);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await taskService.getTask(req.boardParams.id, req.params.id);

    res.status(HttpStatus.OK).json(task);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.boardParams.id, req.body);

    res.status(HttpStatus.OK).json(task);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const params = {
      boardId: req.boardParams.id,
      taskId: req.params.id,
      task: req.body,
    };
    const task = await taskService.updateTask(params);

    res.status(HttpStatus.OK).json(task);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await taskService.deleteTask(req.boardParams.id, req.params.id);

    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
