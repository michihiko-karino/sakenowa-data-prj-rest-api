/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { classValidatorOption } from 'src/config/classValidatorOption';

@Injectable()
export class ValidateAndTransformPipe
  implements PipeTransform<{ [key: string]: string }> {
  async transform(
    value: { [key: string]: string },
    { metatype }: ArgumentMetadata,
  ): Promise<any> {
    if (!metatype) {
      return value;
    }
    const transformed = plainToClass(metatype, value);
    const errors = await validate(transformed, classValidatorOption);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return transformed;
  }
}
