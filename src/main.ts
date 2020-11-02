import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { classValidatorOption } from './config/classValidatorOption';
import { globalFilters } from './config/globalFilters';
import { Logger } from './logger/logger.service';

async function bootstrap() {
  const globalLogger = new Logger();
  const app = await NestFactory.create(AppModule, { logger: false });
  const configService: ConfigService = app.get(ConfigService);

  // Logging
  app.useLogger(globalLogger);

  // cors
  app.enableCors();

  // ValidationPipeline
  app.useGlobalPipes(
    new ValidationPipe(
      Object.assign(classValidatorOption, {
        exceptionFactory: (errors: unknown) => new BadRequestException(errors),
      }),
    ),
  );
  // ExceptionFilters
  app.useGlobalFilters(
    ...globalFilters(configService.get<string>('env') || 'develop'),
  );

  // request logger
  app.use(
    morgan(':method :url :status :response-time ms - :res[content-length]', {
      stream: { write: (log: string) => globalLogger.log(log) },
    }),
  );

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(
    Number(configService.get<string>('port')) || 3000,
    '0.0.0.0',
  );
}
bootstrap();
