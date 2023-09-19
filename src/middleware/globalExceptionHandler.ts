import { FastifyReply, FastifyRequest } from 'fastify';
import { MESSAGES } from '../config/constants';
import AppLogger from '../utils/AppLogger';
import { appCommonTypes } from '../@types/app-common';
import { AxiosError } from 'axios';
import HttpStatus from '../helpers/HttpStatus';
import CustomAPIError from '../exceptions/CustomAPIError';

const logger = AppLogger.init(globalExceptionHandler.name).logger;

export default async function globalExceptionHandler (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const response: appCommonTypes.HttpResponse<null> = {
    code: HttpStatus.INTERNAL_SERVER_ERROR.code,
    message: MESSAGES.http['500'],
  };

  if (error instanceof CustomAPIError) {
    logger.error(error.message);
    logger.error(error.stack);

    response.code = error.code;
    response.message = error.message;

    reply.code(error.code).send(response);
    return;
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      logger.error(error.message);
      logger.error(error.response.data);

      response.code = error.response.status;
      response.message = error.message;

      reply.code(response.code).send(response);
      return;
    }

    if (error.request) {
      logger.error(error.message);
      logger.error(error.request);

      response.message = error.message;

      reply.code(response.code).send(response);
      return;
    }

    console.log('out of here');

    reply.code(response.code).send(response);
    return;
  }

  process.on('uncaughtException', (err) => {
    logger.error(err.message);
    logger.error(err.stack);

    response.message = err.message;
    reply.code(response.code).send(response);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(reason);

    response.message = reason as unknown as string;

    reply.code(response.code).send(response);
  });

  logger.error(error.message);
  logger.error(error.stack);

  response.message = error.message || `${error}`;

  reply.code(response.code).send(response);
};

// export default globalExceptionHandler;
