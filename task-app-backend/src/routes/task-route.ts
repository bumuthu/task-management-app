import { Router } from 'express';
import { getAllTasks, createTask, updateTaskById, deleteTaskById, getTaskById } from '../controllers/task-controller';

const taskRouter = Router();

taskRouter.get('/tasks', getAllTasks);
taskRouter.get('/tasks/:id', getTaskById);
taskRouter.post('/tasks', createTask);
taskRouter.put('/tasks/:id', updateTaskById);
taskRouter.delete('/tasks/:id', deleteTaskById);

export default taskRouter;