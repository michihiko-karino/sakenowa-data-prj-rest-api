import { Injectable, LoggerService, Scope } from '@nestjs/common';
import * as winston from 'winston';

// https://github.com/winstonjs/winston
@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerService {
  logger: winston.Logger;

  constructor() {
    const fileFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    );

    // levelにdebugを指定することでdebug以上のLevelのログが出力される
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/app-server-error.log',
          level: 'error',
          format: fileFormat,
        }),
        new winston.transports.File({
          filename: 'logs/app-server-default.log',
          level: 'debug',
          format: fileFormat,
        }),
      ],
    });

    this.logger = logger;
  }

  log(message: string): void {
    this.logger.log({
      level: 'info',
      message: `${message}`,
    });
  }

  error(message: string, trace: string): void {
    this.logger.log({
      level: 'error',
      message: `${message}:${trace}`,
    });
  }

  warn(message: string): void {
    this.logger.log({
      level: 'warn',
      message: `WARNING: ${message}`,
    });
  }

  debug(message: string): void {
    this.logger.log({
      level: 'debug',
      message: `${message}`,
    });
  }

  verbose(message: string): void {
    this.logger.log({
      level: 'verbose',
      message: `${message}`,
    });
  }
}
