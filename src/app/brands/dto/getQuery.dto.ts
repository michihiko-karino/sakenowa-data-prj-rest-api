import { applyDecorators } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { IdParam } from 'src/dto/idParams.req';

export class GetQueryDTO extends IdParam {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const GetQuerySchema = () =>
  applyDecorators(
    ApiParam({
      name: 'id',
      description: '銘柄ID指定',
      required: true,
      explode: false,
      type: Number,
      example: '/1',
    }),
  );