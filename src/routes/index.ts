import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../docs/swagger.json';

import TaskRoutes from './TaskRouter';

const routes = Router();

routes.use(TaskRoutes);

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default routes;
