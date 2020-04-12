import { Container } from 'inversify';
import { TASK_SERVICE_IDENTIFIER } from './task.constants';
import { TaskRepository } from './task.interface';
import { TaskService } from './task.service';
import { TaskMemoryRepository } from './task.memory.repository';

export class TaskModule {
  static container: Container;

  static init() {
    TaskModule.container = new Container();
    TaskModule.container.bind<TaskRepository>(TASK_SERVICE_IDENTIFIER.TASK_REPOSITORY).to(TaskMemoryRepository);
    TaskModule.container.bind<TaskService>(TASK_SERVICE_IDENTIFIER.TASK_SERVICE).to(TaskService);
  }

  static get<T>(serviceType) {
    return TaskModule.container.get<T>(serviceType);
  }
}
