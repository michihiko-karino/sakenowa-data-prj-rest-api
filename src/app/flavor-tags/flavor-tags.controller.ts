import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { LicensedDTO, LicensedDTODecorator } from 'src/decorators/licensedDTO.decorator';
import { FlavorTag, FlavorTagEntity } from 'src/entities/flavorTag.entity';
import { LicenseInterceptor } from 'src/interceptors/license.interceptor';
import { Repository } from 'typeorm';

@ApiTags('flavorTags')
@Controller('flavorTags')
@ApiExtraModels(LicensedDTO, FlavorTag)
export class FlavorTagsController {
  readonly #FlavorTagRepository: Repository<FlavorTagEntity>;

  constructor(
    @InjectRepository(FlavorTagEntity)
    FlavorTagRepository: Repository<FlavorTagEntity>,
  ) {
    this.#FlavorTagRepository = FlavorTagRepository;
  }

  @Get()
  @LicensedDTODecorator([FlavorTag])
  @UseInterceptors(LicenseInterceptor)
  async list(): Promise<FlavorTagEntity[]> {
    return this.#FlavorTagRepository.find();
  }
}
