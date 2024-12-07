import { Request, Response } from 'express';
import { createTask } from '../../controllers/task-controller';

describe('Task Controller', () => {
  it('should create a new task', () => {
    const req = { body: { title: 'Test Task', completed: false } } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    createTask(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ title: 'Test Task', completed: false });
  });
});