import { ExceptionFilter } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/exceptionFilters/allExceptions.filter';
import { BadRequestExceptionFilter } from 'src/exceptionFilters/badRequestException.filter';
import { QueryFailedExceptionFilter } from 'src/exceptionFilters/queryFailedException.filter';

/**
 * 使用するExceptionFilterを返却する
 * 本番環境であれば、コード中明示的に使用するExceptionのみを拾う
 * 開発環境であれば、デバッグのために便利なExceptionFilterを有効にする
 */
export const globalFilters = (env: string): ExceptionFilter[] => {
  const filters: ExceptionFilter[] = [];

  // すべての例外を拾うので最後に有効にする
  filters.push(new AllExceptionsFilter());

  // 明示的に使用するExceptionFilter
  filters.push(new BadRequestExceptionFilter());

  if (env === 'develop') {
    filters.push(new QueryFailedExceptionFilter());
  }

  return filters;
};
