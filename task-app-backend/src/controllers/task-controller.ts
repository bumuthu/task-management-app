import { Request, Response } from 'express';
import { TaskServiceFactory } from '../services/task-service-factory';
import { DatabaseType } from '../utils/enums';
import { TaskModel } from '../models/entities';

const taskService = TaskServiceFactory.createService(TaskServiceFactory.getDatabaseType());

export const getAllTasks = async (req: Request, res: Response) => {
    const tasks = await taskService.getAll();
    res.status(200).json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await taskService.get(id);
    res.status(200).json(task);
};

export const createTask = async (req: Request, res: Response) => {
    const newTask: TaskModel = req.body;
    const createdTask = await taskService.create(newTask);
    res.status(201).json(createdTask);
};

export const updateTaskById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const taskUpdate: TaskModel = req.body;
    const updatedTask = await taskService.update(id, taskUpdate);
    res.status(200).json(updatedTask);
};

export const deleteTaskById = async (req: Request, res: Response) => {
    const id = req.params.id;
    await taskService.delete(id);
    res.status(204).send();
};