import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional()
});

export const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional()
});

export const taskIdParamSchema = z.object({
    id: z.string().uuid('Invalid task ID format')
});