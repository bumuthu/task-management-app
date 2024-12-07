import { Router } from 'express';
import { getAllTasks, createTask, updateTaskById, deleteTaskById, getTaskById } from '../controllers/task-controller';
import { validatePathParams, validateRequest } from '../middlewares/request-validation';
import { createTaskSchema, taskIdParamSchema, updateTaskSchema } from './task-zod-schema';

const taskRouter = Router();

taskRouter.get('/tasks', getAllTasks);
taskRouter.get('/tasks/:id', validatePathParams(taskIdParamSchema), getTaskById);
taskRouter.post('/tasks', validateRequest(createTaskSchema), createTask);
taskRouter.put('/tasks/:id', validatePathParams(taskIdParamSchema), validateRequest(updateTaskSchema), updateTaskById);
taskRouter.delete('/tasks/:id', validatePathParams(taskIdParamSchema), deleteTaskById);

export default taskRouter;