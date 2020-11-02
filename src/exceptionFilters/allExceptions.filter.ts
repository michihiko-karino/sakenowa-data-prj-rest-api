/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorRes } from './error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let errorResponse: ErrorRes;

    if (exception instanceof HttpException) {
      errorResponse = new ErrorRes(
        (exception.getResponse() as any)?.error || 'error',
        exception.message,
        exception.getStatus(),
        request.url,
      );
    } else {
      console.error(exception);

      errorResponse = new ErrorRes(
        'Internal Server Error',
        (exception as any)?.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        request.url,
      );
    }

    response.status(errorResponse.statusCode).send(errorResponse);
  }
}
