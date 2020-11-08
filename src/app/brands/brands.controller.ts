import { Controller, Get, Query } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { IdAndQuery } from 'src/decorators/idAndQuery';
import {
  LicensedDTO,
  LicensedDTODecorator,
} from 'src/decorators/licensedDTO.decorator';
import { BrandList, BrandEntity, BrandDetail } from 'src/entities/brand.entity';
import { LicenseInterceptor } from 'src/interceptors/license.interceptor';
import { ValidateAndTransformPipe } from 'src/pipes/validateAndTransformPipe';
import { BrandsService } from './brands.service';
import { GetQueryDTO, GetQuerySchema } from './dto/getQuery.dto';
import { SearchQueryDTO, SearchQuerySchema } from './dto/searchQuery.dto';

@ApiTags('brands')
@Controller('brands')
@ApiExtraModels(LicensedDTO, BrandDetail, BrandList)
export class BrandsController {
  readonly #brandsService: BrandsService;

  constructor(brandsService: BrandsService) {
    this.#brandsService = brandsService;
  }

  @Get()
  @SearchQuerySchema()
  @LicensedDTODecorator([BrandList])
  @UseInterceptors(LicenseInterceptor)
  async findAll(@Query() query: SearchQueryDTO): Promise<BrandEntity[]> {
    return await this.#brandsService.findWith(query);
  }

  @Get(':id')
  @GetQuerySchema()
  @LicensedDTODecorator(BrandDetail)
  @UseInterceptors(LicenseInterceptor)
  async findOne(
    @IdAndQuery(ValidateAndTransformPipe) params: GetQueryDTO,
  ): Promise<BrandEntity | void> {
    return await this.#brandsService.findById(params.id);
  }
}
