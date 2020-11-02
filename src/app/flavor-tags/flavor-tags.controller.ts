import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlavorTagEntity } from 'src/entities/flavorTag.entity';
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
  async list(): Promise<FlavorTagEntity[]> {
    return this.#FlavorTagRepository.find();
  }
}
