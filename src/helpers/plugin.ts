import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

export async function helmetPlugin(fastify: any, options: any) {
  fastify.addHook('onRequest', (req: any, reply: any, done: any) => {
    helmet()(req.raw, reply.res, done);
  });
}

export async function corsPlugin(fastify: any, options: any) {
    fastify.addHook('onRequest', (req: any, reply: any, done: any) => {
      cors()(req.raw, reply.res, done);
    });
}

export async function morganPlugin(fastify: any, options: any) {
  fastify.addHook('onRequest', (req: any, reply: any, done: any) => {
    morgan('dev')(req.raw, reply.res, done);
  });
}

