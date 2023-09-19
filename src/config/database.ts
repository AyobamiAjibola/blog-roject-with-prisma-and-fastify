import { PrismaClient } from '../prisma/generated/client';
import settings from './settings';
import { appCommonTypes } from '../@types/app-common';
import DatabaseEnv = appCommonTypes.DatabaseEnv;

const env = process.env.NODE_ENV as DatabaseEnv;

const postgresConfig = settings.postgres[env];

// Initialize Prisma Client
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://${postgresConfig.dialect}:${postgresConfig.password}@localhost:${postgresConfig.port}/${postgresConfig.database}`,
      },
    },
    log: ['query', 'info', 'warn', 'error'],
  });

// If you want to use Prisma with cls-hooked (optional)
import { createNamespace } from 'cls-hooked';

if (postgresConfig.database) {
  const namespace = createNamespace(postgresConfig.database);
  prisma.$use(async (params: any, next: any) => {
    return namespace.runAndReturn(() => {
      // Attach context to Prisma queries (optional)
      return next(params);
    });
  });
}

const database = {
  init: async () => {
    try {
      await prisma.$connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Failed to connect to the database', error);
    }
  },
  prisma
};

export default database;