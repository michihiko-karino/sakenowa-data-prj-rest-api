import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { ErrorRes } from './error';

const buildMessages = (messages: ValidationError[] | string) => {
  if (typeof messages === 'string') {
    return [messages];
  }
  const nestedMessages = messages.map((m) =>
    // nestedなプロパティのバリデーションを拾うため再帰的にしている
    m.constraints ? Object.values(m.constraints) : buildMessages(m.children),
  ) as Array<string[]>;
  const flattenedMessage = ([] as string[]).concat(...nestedMessages);
  return flattenedMessage;
};

type ExceptionResponse = string | { message: ValidationError[] | string };

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const { url } = request;
    const code = exception.getStatus();
    const errorRes = exception.getResponse() as ExceptionResponse;
    const errorMessage =
      typeof errorRes === 'string'
        ? [errorRes]
        : buildMessages(errorRes.message);
    const errorResponse = new ErrorRes('Bad Request', errorMessage, code, url);

    response.status(HttpStatus.BAD_REQUEST).send(errorResponse);
  }
}
