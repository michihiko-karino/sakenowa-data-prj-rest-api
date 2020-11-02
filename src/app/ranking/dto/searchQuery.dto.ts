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
