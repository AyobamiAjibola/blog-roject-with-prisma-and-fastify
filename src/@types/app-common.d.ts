import { appModelTypes } from './app-model';

export declare namespace appCommonTypes {
  
    type DatabaseEnv = 'development' | 'production' | 'test';
  
    interface DatabaseConfig {
      host?: string;
      username?: string;
      password?: string;
      port?: string;
      dialect?: string;
      database?: string;
    }
  
    interface AppSettings {
      service: {
        port: string;
        env: string;
        apiRoot?: string;
      };
      cookie: { name: string; secret: string };
      postgres: Record<DatabaseEnv, DatabaseConfig>;
    }
  
    interface HttpResponse<T> {
      message: string;
      code: number;
      timestamp?: string;
      result?: T | null;
      results?: T[];
    }
  
    interface RouteEndpointConfig {
      name: string;
      path: string;
      method: string;
      handler: AsyncWrapper;
      hasRole?: string;
      hasAuthority?: string;
      hasAnyRole?: string[];
      hasAnyAuthority?: string[];
    }
  
    type RouteEndpoints = RouteEndpointConfig[];
  }
  
  declare global {
    namespace Express {
      export interface Request {
        files: Files;
        fields: Fields;
        permissions: Attributes<Permission>[];
        user: User;
        form: IncomingForm;
        jwt: string;
      }
    }
  }