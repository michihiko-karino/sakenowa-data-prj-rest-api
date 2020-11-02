/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { QueryRunner, Logger as TypeORMLogger } from 'typeorm';
import { Logger } from './logger.service';

export class QueryLogger implements TypeORMLogger {
  static init() {
    return new QueryLogger(new Logger());
  }

  constructor(private readonly logger: Logger) {}

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.debug(this.queryRawer(query, parameters));
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.error(this.queryRawer(query, parameters), error);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.warn(
      `Time: ${time} | Query: ${this.queryRawer(query, parameters)}`,
    );
  }

  // 何もしない
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    return;
  }
  logMigration(message: string, queryRunner?: QueryRunner) {
    return;
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ): void {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.log(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }

  // RAW SQLを出力する
  private queryRawer(query: string, parameters?: any[]): string {
    if (!parameters) {
      return query;
    }
    const copyParams = Array.from(parameters);
    return query.replace(/\?/g, () => copyParams.shift() || '?');
  }
}
