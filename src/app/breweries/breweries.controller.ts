import { Controller, Get, Query } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { IdAndQuery } from 'src/decorators/idAndQuery';
import { LicensedDTO, LicensedDTODecorator } from 'src/decorators/licensedDTO.decorator';
import { BreweryDetail, BreweryList, BreweryEntity } from 'src/entities/brewery.entity';
import { LicenseInterceptor } from 'src/interceptors/license.interceptor';
import { ValidateAndTransformPipe } from 'src/pipes/validateAndTransformPipe';
import { BreweriesService } from './breweries.service';
import { GetQueryDTO,GetQuerySchema } from './dto/getQuery.dto';
import { SearchQueryDTO, SearchQuerySchema } from './dto/searchQuery.dto';

@ApiTags('breweries')
@Controller('breweries')
@ApiExtraModels(LicensedDTO, BreweryDetail,BreweryList)
export class BreweriesController {
  readonly #breweriesService: BreweriesService;

  constructor(breweriesService: BreweriesService) {
    this.#breweriesService = breweriesService;
  }

  @Get()
  @SearchQuerySchema()
  @LicensedDTODecorator([BreweryList])
  @UseInterceptors(LicenseInterceptor)
  async findAll(@Query() query: SearchQueryDTO): Promise<BreweryEntity[]> {
    return await this.#breweriesService.findWith(query);
  }

  @Get(':id')
  @GetQuerySchema()
  @LicensedDTODecorator(BreweryDetail)
  @UseInterceptors(LicenseInterceptor)
  async findOne(
    @IdAndQuery(ValidateAndTransformPipe) params: GetQueryDTO,
  ): Promise<BreweryEntity | void> {
    return await this.#breweriesService.findById(params.id);
  }
}
