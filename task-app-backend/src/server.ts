import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRouter from './routes/task-route';
import { errorHandler } from './middlewares/error-handler';
import { logger } from './middlewares/logger';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);
app.use(logger);

app.use('/api', taskRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
