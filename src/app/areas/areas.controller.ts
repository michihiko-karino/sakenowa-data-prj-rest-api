import { Controller, Get } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaEntity } from 'src/entities/area.entity';
import { LicenseInterceptor } from 'src/interceptors/license.interceptor';
import { Repository } from 'typeorm';

@Controller('areas')
export class AreasController {
  readonly #AreaRepository: Repository<AreaEntity>;

  constructor(
    @InjectRepository(AreaEntity)
    AreaRepository: Repository<AreaEntity>,
  ) {
    this.#AreaRepository = AreaRepository;
  }

  @Get()
  @UseInterceptors(LicenseInterceptor)
  async list(): Promise<AreaEntity[]> {
    return this.#AreaRepository.find();
  }
}
