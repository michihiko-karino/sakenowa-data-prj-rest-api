import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlavorTagEntity } from 'src/entities/flavorTag.entity';
import { LicenseInterceptor } from 'src/interceptors/license.interceptor';
import { Repository } from 'typeorm';

@Controller('flavorTags')
export class FlavorTagsController {
  readonly #FlavorTagRepository: Repository<FlavorTagEntity>;

  constructor(
    @InjectRepository(FlavorTagEntity)
    FlavorTagRepository: Repository<FlavorTagEntity>,
  ) {
    this.#FlavorTagRepository = FlavorTagRepository;
  }

  @Get()
  @UseInterceptors(LicenseInterceptor)
  async list(): Promise<FlavorTagEntity[]> {
    return this.#FlavorTagRepository.find();
  }
}
