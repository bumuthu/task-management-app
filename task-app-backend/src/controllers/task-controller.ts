import { Request, Response } from 'express';
import { TaskServiceFactory } from '../services/task-service-factory';
import { TaskModel } from '../models/entities';

const taskService = TaskServiceFactory.createService(TaskServiceFactory.getDatabaseType());

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAll();
        res.status(200).json(tasks);
    } catch (err) {
        console.error("Failed to retrieve all tasks", err);
        res.status(500).json({ error: "Failed to retrieve all tasks" });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const task = await taskService.get(id);
        res.status(200).json(task);
    } catch (err) {
        console.error("Failed to retrieve task", err);
        res.status(500).json({ error: "Failed to retrieve task" });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const newTask: TaskModel = req.body;
        const createdTask = await taskService.create(newTask);
        res.status(201).json(createdTask);
    } catch (err) {
        console.error("Failed to create task", err);
        res.status(500).json({ error: "Failed to create task" });
    }
};

export const updateTaskById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const taskUpdate: TaskModel = req.body;
        const updatedTask = await taskService.update(id, taskUpdate);
        res.status(200).json(updatedTask);
    } catch (err) {
        console.error("Failed to update task", err);
        res.status(500).json({ error: "Failed to update task" });
    }
};

export const deleteTaskById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await taskService.delete(id);
        res.status(204).send();
    } catch (err) {
        console.error("Failed to delete task", err);
        res.status(500).json({ error: "Failed to delete task" });
    }
};