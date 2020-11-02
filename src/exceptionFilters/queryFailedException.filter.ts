import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ErrorRes } from './error';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    // ADD_ME: rawSQL: (exception as any).sql を足したい
    const errorResponse = new ErrorRes(
      'Query Failed Error',
      exception.message,
      statusCode,
      request.url,
    );

    response.status(statusCode).send(errorResponse);
  }
}
