import { Controller, Get, Query } from '@nestjs/common';
import { IdAndQuery } from 'src/decorators/idAndQuery';
import { BreweryEntity } from 'src/entities/brewery.entity';
import { ValidateAndTransformPipe } from 'src/pipes/validateAndTransformPipe';
import { BreweriesService } from './breweries.service';
import { GetQueryDTO } from './dto/getQuery.dto';
import { SearchQueryDTO } from './dto/searchQuery.dto';

@Controller('breweries')
export class BreweriesController {
  readonly #breweriesService: BreweriesService;

  constructor(breweriesService: BreweriesService) {
    this.#breweriesService = breweriesService;
  }

  @Get()
  async findAll(@Query() query: SearchQueryDTO): Promise<BreweryEntity[]> {
    return await this.#breweriesService.findWith(query);
  }

  @Get(':id')
  async findOne(
    @IdAndQuery(ValidateAndTransformPipe) params: GetQueryDTO,
  ): Promise<BreweryEntity | void> {
    return await this.#breweriesService.findById(params.id);
  }
}
