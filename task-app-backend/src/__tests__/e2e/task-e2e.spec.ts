import app from '../../server';
import { TaskStatus } from '../../models/enums';
import request from 'supertest';

describe('Task E2E', () => {
    describe('GET /tasks', () => {
        it('should return all tasks', async () => {
            const response = await request(app).get('/api/tasks');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });

    describe('GET /tasks/:id', () => {
        it('should send a validation error when trying to get a task with invalid uuid format', async () => {
            const response = await request(app).get('/api/tasks/invalid_id');
            expect(response.status).toBe(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: 'Validation error'
                }));
        });

        it('should send null response when trying to get a task with non-exisiting id', async () => {
            const response = await request(app).get('/api/tasks/bd6cc982-fcf4-411f-8bc4-a43d45afbb2a');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(null);
        });
    })

    describe('POST /tasks', () => {
        it('should send a validation error when trying to create a task with no title', async () => {
            const task = { description: 'New Task' };
            const response = await request(app).post('/api/tasks').send(task);
            expect(response.status).toBe(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: 'Validation error'
                }));
        });

        it('should create new task', async () => {
            const task = { title: 'New Task' };
            const createdRes = await request(app).post('/api/tasks').send(task);
            expect(createdRes.status).toBe(201);
            expect(createdRes.body).toEqual(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.PENDING,
                    fileUrl: 'presigned_url'
                }));

            const getRes = await request(app).get('/api/tasks/' + createdRes.body.id);
            expect(getRes.status).toBe(200);
            expect(getRes.body).toEqual(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.PENDING,
                    fileUrl: 'presigned_url'
                }));
        });
    });

    describe('PUT /tasks/:id', () => {
        it('should send a validation error when trying to update a task with invalid id format', async () => {
            const task = { description: 'New Task' };
            const response = await request(app).put('/api/tasks/invalid_id').send(task);
            expect(response.status).toBe(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: 'Validation error'
                }));
        });

        it('should send a validation error when trying to update a task with invalid id', async () => {
            const task = { description: 'New Task' };
            const response = await request(app).put('/api/tasks/bd6cc982-fcf4-411f-8bc4-a43d45afbb2a').send(task);
            expect(response.status).toBe(500);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: 'Failed to update task'
                }));
        });

        it('should update new task', async () => {
            const task = { title: 'New Task' };
            const createRes = await request(app).post('/api/tasks').send(task);
            expect(createRes.status).toBe(201);
            expect(createRes.body).toEqual(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.PENDING,
                    fileUrl: 'presigned_url'
                }));

            const updateRes = await request(app).put('/api/tasks/' + createRes.body.id).send({
                status: TaskStatus.COMPLETED
            });
            expect(updateRes.status).toBe(200);
            expect(updateRes.body).toEqual(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.COMPLETED,
                    fileUrl: 'presigned_url'
                }));

            const getRes = await request(app).get('/api/tasks/' + createRes.body.id);
            expect(getRes.status).toBe(200);
            expect(getRes.body).toEqual(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.COMPLETED,
                    fileUrl: 'presigned_url'
                }));
        });
    });

    describe('DELETE /tasks/:id', () => {
        it('should send a validation error when trying to delete a task with invalid id format', async () => {
            const response = await request(app).delete('/api/tasks/invalid_id');
            expect(response.status).toBe(400);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: 'Validation error'
                }));
        });

        it('should send a validation error when trying to delete a task with invalid id', async () => {
            const response = await request(app).delete('/api/tasks/bd6cc982-fcf4-411f-8bc4-a43d45afbb2a');
            expect(response.status).toBe(500);
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: 'Failed to delete task'
                }));
        });

        it('should delete task', async () => {
            const task = { title: 'New Task' };
            const createRes = await request(app).post('/api/tasks').send(task);
            expect(createRes.status).toBe(201);
            expect(createRes.body).toEqual(
                expect.objectContaining({
                    title: task.title,
                    status: TaskStatus.PENDING,
                    fileUrl: 'presigned_url'
                }));

            const deletedRes = await request(app).delete('/api/tasks/' + createRes.body.id);
            expect(deletedRes.status).toBe(204);

            const getRes = await request(app).get('/api/tasks/' + createRes.body.id);
            expect(getRes.status).toBe(200);
            expect(getRes.body).toEqual(null);
        });
    });
});