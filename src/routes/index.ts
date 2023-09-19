// import fastify from 'fastify';
// import endpoints from '../config/endpoints';
// // import asyncErrorWrapper from '../middleware/asyncErrorWrapper';

// type RouteMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';

// const router = fastify();

// endpoints.forEach((value: any) => {
//   const method = value.method as RouteMethods;

//   router.route({
//     method,
//     url: value.path,
//     // handler: async (request, reply) => {
//     //   await asyncErrorWrapper(value.handler)(request, reply);
//     // },
//     handler: async (request, reply) => {
//         try {
//           // Call your route handler directly
//           await value.handler(request, reply);
//         } catch (error) {
//           // Handle errors here
//           reply.status(500).send({ error: 'Internal Server Error' });
//         }
//       },
//   });
// });

// export default router;

import { FastifyPluginAsync } from 'fastify';
import endpoints from '../config/endpoints';

type RouteMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';

const routes: FastifyPluginAsync = async (fastify) => {
  endpoints.forEach((value: any) => {
    const method = value.method as RouteMethods;
    fastify.route({
      method,
      url: value.path,
      handler: async (request, reply) => {
        try {
          // Call your route handler directly
          await value.handler(request, reply);
        } catch (error) {
          // Handle errors here
          reply.status(500).send({ error: 'Internal Server Error' });
        }
      },
    });
  });
};

export default routes;

