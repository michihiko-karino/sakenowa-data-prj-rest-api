import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BreweryEntity } from './../../entities/brewery.entity';
import { SearchQueryDTO } from './dto/searchQuery.dto';

@Injectable()
export class BreweriesService {
  readonly #DEFAULT_LIMIT: number = 30;
  readonly #BreweryRepository: Repository<BreweryEntity>;

  constructor(
    @InjectRepository(BreweryEntity)
    BreweryRepository: Repository<BreweryEntity>,
  ) {
    this.#BreweryRepository = BreweryRepository;
  }

  async findById(id: number): Promise<BreweryEntity | void> {
    return this.#BreweryRepository.findOne(id, {
      relations: ['area', 'brands'],
    });
  }

  async findWith(query: SearchQueryDTO): Promise<BreweryEntity[]> {
    const where = Object.assign(
      query.ids ? { id: In(query.ids) } : {},
      query.name ? { name: query.name } : {},
      query.areaCodes ? { area: In(query.areaCodes) } : {},
    );
    const take = query.limit || this.#DEFAULT_LIMIT;
    const skip = (query.page - 1) * take;

    return await this.#BreweryRepository.find({
      where: where,
      relations: ['area'],
      take: take,
      skip: skip,
    });
  }
}
