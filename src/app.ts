import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

import routes from './routes';
import corsConfig from './config/cors';
import helmetConfig from './config/helmet';

const app = express();

app.use(express.json());
app.use(cors(corsConfig));
app.use(helmet(helmetConfig));
app.use(routes);

export default app;
