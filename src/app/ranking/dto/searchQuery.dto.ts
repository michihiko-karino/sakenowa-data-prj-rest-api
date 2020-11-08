import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {
  CIsIn,
  CIsPositive,
  CIsString,
} from 'src/decorators/standardClassValidators';

export class SearchQueryDTO {
  @CIsIn(['all', 'area'], { propertyName: '対象範囲' })
  @IsOptional()
  readonly areaType?: 'all' | 'area';

  @CIsPositive({
    propertyName: '地域ID',
  })
  @IsOptional()
  @Transform((value) => Number(value))
  readonly areaId?: number;

  @CIsString({
    propertyName: '集計年月',
  })
  @IsOptional()
  readonly yearMonth?: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SearchQuerySchema = () =>
  applyDecorators(
    ApiQuery({
      name: 'areaType',
      description: '対象範囲を指定。all:全国 area:地域、デフォルトall',
      required: false,
      explode: false,
      type: String,
      example: 'all',
    }),
    ApiQuery({
      name: 'areaId',
      description: '対象範囲を地域にした時に同時に地域IDを指定',
      required: false,
      explode: false,
      type: Number,
      example: '1',
    }),
    ApiQuery({
      name: 'yearMonth',
      description: '集計年月を指定。デフォルトで最新の年月を取得',
      required: false,
      explode: false,
      type: String,
      example: '202009',
    }),
  );
