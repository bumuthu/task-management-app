import { Router } from 'express';
import { healthCheck } from '../controllers/health-check-controller';

const healthCheckRouter = Router();

healthCheckRouter.get('/health', healthCheck);

export default healthCheckRouter;