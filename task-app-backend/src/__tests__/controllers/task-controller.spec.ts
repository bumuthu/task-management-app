import { Request, Response } from 'express';
import { createTask, deleteTaskById, getAllTasks, getTaskById, updateTaskById } from '../../controllers/task-controller';
import { TaskStatus } from '../../models/enums';

describe('Task Controller', () => {
    const req = {} as Request;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTasks', () => {
        it('should return empty tasks list', async () => {
            await getAllTasks(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

    describe('getTaskById', () => {
        it('should return task by id', async () => {
            req.params = { id: 'invalid_id' };
            await getTaskById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(null);
        });

    });

    describe('createTask', () => {
        it('should create new task', async () => {
            const task = { title: 'New Task' };
            req.body = task;
            await createTask(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.PENDING,
                    uploadUrl: 'presigned_url'
                })
            );

            // should be able to get task by id
            const taskCreated = (res.json as any).mock.calls[0][0];
            req.params = { id: taskCreated.id };
            req.body = undefined;
            await getTaskById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                title: task.title,
                status: TaskStatus.PENDING,
                uploadUrl: 'presigned_url'
            }));
        });
    });

    describe('updateTaskById', () => {
        it('should update task by id', async () => {
            const task = { title: 'New Task' };
            req.body = task;
            await createTask(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.PENDING,
                    uploadUrl: 'presigned_url'
                })
            );

            // task update
            const taskCreated = (res.json as any).mock.calls[0][0];
            req.params = { id: taskCreated.id };
            const update = { status: TaskStatus.IN_PROGRESS };
            req.body = update;
            await updateTaskById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.IN_PROGRESS,
                    uploadUrl: 'presigned_url'
                })
            );

            // should be able to get task by id
            req.params = { id: taskCreated.id };
            req.body = undefined;
            await getTaskById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                title: task.title,
                status: TaskStatus.IN_PROGRESS,
                uploadUrl: 'presigned_url'
            }));
        });

    });

    describe('deleteTaskById', () => {
        it('should delete task by id', async () => {
            const task = { title: 'New Task' };
            req.body = task;
            await createTask(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.PENDING,
                    uploadUrl: 'presigned_url'
                })
            );

            // task deletion
            const taskCreated = (res.json as any).mock.calls[0][0];
            req.params = { id: taskCreated.id };
            req.body = undefined;
            await deleteTaskById(req, res);
            expect(res.status).toHaveBeenCalledWith(204);

            // should return null after deletion
            req.params = { id: taskCreated.id };
            req.body = undefined;
            await getTaskById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(null);
        });
    });
});