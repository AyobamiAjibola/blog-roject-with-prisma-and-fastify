import fastify, { FastifyInstance } from 'fastify';
import path from 'path';
import settings from './config/settings';
import globalExceptionHandler from './middleware/globalExceptionHandler';
import { corsPlugin, helmetPlugin, morganPlugin } from './helpers/plugin';
import routes from './routes';
import fastifyFormBody from '@fastify/formbody';

const app: FastifyInstance = fastify({
  logger: true,
});

export const corsOptions = {
  origin: [],
  credentials: true,
};

app.register(helmetPlugin);
app.register(corsPlugin, corsOptions);
app.register(morganPlugin);
app.register(fastifyFormBody)
app.register(routes, { prefix: settings.service.apiRoot });

// Global error handler
app.setErrorHandler(globalExceptionHandler);

export default app;
