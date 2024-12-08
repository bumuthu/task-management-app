import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRouter from './routes/task-route';
import { errorHandler } from './middlewares/error-handler';
import { logger } from './middlewares/logger';
import ConfigProvider from './config/config-provider';
import userRouter from './routes/user-route';
import swaggerUi from 'swagger-ui-express';
const spec = require('../doc/spec.json');

const port = ConfigProvider.get('PORT') as number;

const app: Express = express();

// Adding middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(logger);
app.use(errorHandler);

// Adding routes
app.use('/api', taskRouter);
app.use('/api', userRouter);

// Adding api spec
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;