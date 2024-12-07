import { Request, Response } from 'express';
import { TaskServiceFactory } from '../services/task-service-factory';
import { DatabaseType } from '../utils/enums';
import { TaskModel } from '../models/entities';

const taskService = TaskServiceFactory.createService(DatabaseType.IN_MEMORY);

export const getAllTasks = (req: Request, res: Response): void => {
    res.status(200).json(taskService.getAll());
};

export const getTaskById = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.status(200).json(taskService.get(id));
};

export const createTask = (req: Request, res: Response): void => {
    const newTask: TaskModel = req.body;
    const createdTask = taskService.create(newTask);
    res.status(201).json(createdTask);
};

export const updateTaskById = (req: Request, res: Response): void => {
    const id = req.params.id;
    const taskUpdate: TaskModel = req.body;
    const updatedTask = taskService.update(id, taskUpdate);
    res.status(200).json(updatedTask);
};

export const deleteTaskById = (req: Request, res: Response): void => {
    const id = req.params.id;
    taskService.delete(id);
    res.status(204).send();
};