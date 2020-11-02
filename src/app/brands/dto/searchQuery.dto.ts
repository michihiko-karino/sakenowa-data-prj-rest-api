import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CIsPositive, CIsString } from 'src/decorators/standardClassValidators';
import { toNumberList } from 'src/dto/transformer';

export class SearchQueryDTO {
  @CIsPositive({
    propertyName: '銘柄ID',
    validationOptions: { each: true },
  })
  @IsOptional()
  @Transform((value) => toNumberList(value))
  readonly ids?: number[];

  @CIsString({
    propertyName: '銘柄名',
  })
  @IsOptional()
  readonly name?: string;

  @CIsPositive({
    propertyName: '蔵元ID',
  })
  @IsOptional()
  @Transform((value) => Number(value))
  readonly breweryId?: number;

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
