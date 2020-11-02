import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/entities/brand.entity';
import { In, Repository } from 'typeorm';
import { SearchQueryDTO } from './dto/searchQuery.dto';

@Injectable()
export class BrandsService {
  readonly #DEFAULT_LIMIT: number = 30;
  readonly #BrandRepository: Repository<BrandEntity>;

  constructor(
    @InjectRepository(BrandEntity)
    BrandRepository: Repository<BrandEntity>,
  ) {
    this.#BrandRepository = BrandRepository;
  }

  async findById(id: number): Promise<BrandEntity | void> {
    return this.#BrandRepository.findOne(id, {
      relations: ['brewery', 'flavorTags', 'flavorChart'],
    });
  }

  async findWith(query: SearchQueryDTO): Promise<BrandEntity[]> {
    const where = Object.assign(
      query.ids ? { id: In(query.ids) } : {},
      query.name ? { name: query.name } : {},
      query.breweryId ? { brewery: query.breweryId } : {},
    );
    const take = query.limit || this.#DEFAULT_LIMIT;
    const skip = (query.page - 1) * take;

    return await this.#BrandRepository.find({
      where: where,
      relations: ['brewery'],
      take: take,
      skip: skip,
    });
  }
}
