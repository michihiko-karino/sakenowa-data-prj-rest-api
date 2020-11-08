import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const License = {
  description_ja: 'このデータはさけのわによって提供されています。',
  description_en: 'This data is provided by sakenowa.',
  sakenowa_link: 'https://sakenowa.com',
};

export type Response<T> = typeof License & {
  data: T;
};

@Injectable()
export class LicenseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(map((data) => Object.assign({}, License, { data })));
  }
}
