import { body } from 'express-validator';
import { NextFunction, Request, Response, Router } from 'express';

import database from '../database';
import { Validation } from './ValidationMiddleware';

const client = database.client;

const routes = Router();

const taskValidation = [
  body('title').isString().isLength({ min: 1, max: 255 }),
  body('description').isString().isLength({ min: 1, max: 255 }).optional(),
  body('deadline').isISO8601().toDate(),
];

async function TaskFinder(request: Request, response: Response, next: NextFunction) {
  const { taskId } = request.params;

  const task = await client.task.findFirst({ where: { id: taskId } });
  if (!task) {
    return response.status(404).json({ message: 'Task not found' });
  }

  response.locals.task = task;
  return next();
}

routes.get('/tasks', async (request: Request, response: Response) => {
  const tasks = await client.task.findMany();
  return response.status(200).json(tasks);
});

routes.post('/tasks', taskValidation, Validation, async (request: Request, response: Response) => {
  const task = await client.task.create({
    data: request.body,
  });

  return response.status(201).json(task);
});

routes.get('/tasks/:taskId', TaskFinder, (request: Request, response: Response) => {
  const { task } = response.locals;
  return response.status(200).json(task);
});

routes.put(
  '/tasks/:taskId',
  TaskFinder,
  taskValidation,
  Validation,
  async (request: Request, response: Response) => {
    const { task } = response.locals;

    const updatedTask = await client.task.update({
      where: { id: task.id },
      data: request.body,
    });

    return response.status(200).json(updatedTask);
  },
);

routes.delete('/tasks/:taskId', TaskFinder, async (request: Request, response: Response) => {
  const { task } = response.locals;

  await client.task.delete({
    where: { id: task.id },
  });

  return response.status(204).json();
});

routes.patch(
  '/tasks/:taskId/completed',
  TaskFinder,
  async (request: Request, response: Response) => {
    const { task } = response.locals;

    const date = new Date();

    await client.task.update({
      where: { id: task.id },
      data: { completedAt: date },
    });

    return response.status(204).json();
  },
);

export default routes;
