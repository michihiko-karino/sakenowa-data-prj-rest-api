import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaEntity } from 'src/entities/area.entity';
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
  async list(): Promise<AreaEntity[]> {
    return this.#AreaRepository.find();
  }
}
