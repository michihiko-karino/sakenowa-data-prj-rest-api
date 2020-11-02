import { Controller, Get, Query } from '@nestjs/common';
import { IdAndQuery } from 'src/decorators/idAndQuery';
import { BrandEntity } from 'src/entities/brand.entity';
import { ValidateAndTransformPipe } from 'src/pipes/validateAndTransformPipe';
import { BrandsService } from './brands.service';
import { GetQueryDTO } from './dto/getQuery.dto';
import { SearchQueryDTO } from './dto/searchQuery.dto';

@Controller('brands')
export class BrandsController {
  readonly #brandsService: BrandsService;

  constructor(brandsService: BrandsService) {
    this.#brandsService = brandsService;
  }

  @Get()
  async findAll(@Query() query: SearchQueryDTO): Promise<BrandEntity[]> {
    return await this.#brandsService.findWith(query);
  }

  @Get(':id')
  async findOne(
    @IdAndQuery(ValidateAndTransformPipe) params: GetQueryDTO,
  ): Promise<BrandEntity | void> {
    return await this.#brandsService.findById(params.id);
  }
}
