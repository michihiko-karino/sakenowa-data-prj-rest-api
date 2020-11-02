import { Transform } from 'class-transformer';
import { CIsInt } from 'src/decorators/standardClassValidators';

export class IdParam {
  @CIsInt({ propertyName: 'ID' })
  @Transform((value) => Number(value))
  readonly id!: number;
}
