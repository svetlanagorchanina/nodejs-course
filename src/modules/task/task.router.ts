import { TaskService } from './task.service';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { TASK_SERVICE_IDENTIFIER } from './task.constants';
import { safeHandler } from "../../decorators/safeHandler";
import { Task } from "./task.interface";
import { InjectorService } from '../../services/injectorService';

const router = express.Router({ mergeParams: true });
const taskService: TaskService = InjectorService.get<TaskService>(TASK_SERVICE_IDENTIFIER.TASK_SERVICE);

router.route('/')
  .get(safeHandler.bind(null, async (req, res) => {
    const tasks: Task[] = await taskService.getAll(req.params.boardId);

    res.status(HttpStatus.OK).json(tasks);
  }))
  .post(safeHandler.bind(null, async (req, res) => {
    const task: Task = await taskService.createTask(req.params.boardId, req.body);

    res.status(HttpStatus.OK).json(task);
  }));

router.route('/:id')
  .get(safeHandler.bind(null, async (req, res) => {
    const task: Task = await taskService.getTask(req.params.boardId, req.params.id);

    res.status(HttpStatus.OK).json(task);
  }))
  .put(safeHandler.bind(null, async (req, res) => {
    const params = {
      boardId: req.params.boardId,
      taskId: req.params.id,
      task: req.body,
    };
    const task: Task = await taskService.updateTask(params);

    res.status(HttpStatus.OK).json(task);
  }))
  .delete(safeHandler.bind(null, async (req, res) => {
    await taskService.deleteTask(req.params.boardId, req.params.id);

    res.status(HttpStatus.NO_CONTENT).send();
  }));

module.exports = router;
