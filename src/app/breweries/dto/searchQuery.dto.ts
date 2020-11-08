import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CIsPositive, CIsString } from 'src/decorators/standardClassValidators';
import { toNumberList } from 'src/dto/transformer';

export class SearchQueryDTO {
  @CIsPositive({
    propertyName: '蔵元ID',
    validationOptions: { each: true },
  })
  @IsOptional()
  @Transform((value) => toNumberList(value))
  readonly ids?: number[];

  @CIsPositive({
    propertyName: 'エリアコード',
    validationOptions: { each: true },
  })
  @IsOptional()
  @Transform((value) => toNumberList(value))
  readonly areaCodes?: number[];

  @CIsString({
    propertyName: '蔵元名',
  })
  @IsOptional()
  readonly name?: string;

  @CIsPositive({
    propertyName: '表示件数',
  })
  @IsOptional()
  @Transform((value) => Number(value))
  readonly limit?: number;

  @CIsPositive({
    propertyName: 'ページ番号',
  })
  @IsOptional()
  @Transform((value) => Number(value) || 1)
  readonly page!: number | 1;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SearchQuerySchema = () =>
  applyDecorators(
    ApiQuery({
      name: 'ids',
      description: '蔵元IDをカンマ区切りで複数指定',
      required: false,
      explode: false,
      type: [Number],
      example: '1,2,3',
    }),
    ApiQuery({
      name: 'areaCodes',
      description: '地域IDをカンマ区切りで複数指定',
      required: false,
      explode: false,
      type: [Number],
      example: '1,2,3',
    }),
    ApiQuery({
      name: 'name',
      description: '蔵元名を指定',
      required: false,
      explode: false,
      type: String,
      example: '〇〇酒造',
    }),
    ApiQuery({
      name: 'limit',
      description: '表示件数指定。デフォルト30件',
      required: false,
      explode: false,
      type: Number,
      example: '30',
    }),
    ApiQuery({
      name: 'page',
      description: 'ページ番号指定。デフォルト1ページ目',
      required: false,
      explode: false,
      type: Number,
      example: '1',
    }),
  );
