import { QueryLogger } from 'src/logger/queryLogger';
import { getMetadataArgsStorage } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const environmentVariables = () => ({
  port: process.env.PORT,
  // eslint-disable-next-line no-constant-condition
  database: {
    type: 'mysql' as const,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    synchronize: false,
    keepConnectionAlive: true,
    logger: QueryLogger.init(),
    debug: false,
  },
  env: process.env.APP_ENV as 'develop' | 'production',
});

export type Configs = ReturnType<typeof environmentVariables>;
