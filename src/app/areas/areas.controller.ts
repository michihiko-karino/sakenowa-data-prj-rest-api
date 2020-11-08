import { Controller, Get } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { LicensedDTO, LicensedDTODecorator } from 'src/decorators/licensedDTO.decorator';
import { Area, AreaEntity } from 'src/entities/area.entity';
import { LicenseInterceptor } from 'src/interceptors/license.interceptor';
import { Repository } from 'typeorm';

@ApiTags('areas')
@Controller('areas')
@ApiExtraModels(LicensedDTO, Area)
export class AreasController {
  readonly #AreaRepository: Repository<AreaEntity>;

  constructor(
    @InjectRepository(AreaEntity)
    AreaRepository: Repository<AreaEntity>,
  ) {
    this.#AreaRepository = AreaRepository;
  }

  @Get()
  @LicensedDTODecorator([Area])
  @UseInterceptors(LicenseInterceptor)
  async list(): Promise<AreaEntity[]> {
    return this.#AreaRepository.find();
  }
}
