import { Controller, Get, Query } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { IdAndQuery } from 'src/decorators/idAndQuery';
import { BrandEntity } from 'src/entities/brand.entity';
import { LicenseInterceptor } from 'src/interceptors/license.interceptor';
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
  @UseInterceptors(LicenseInterceptor)
  async findAll(@Query() query: SearchQueryDTO): Promise<BrandEntity[]> {
    return await this.#brandsService.findWith(query);
  }

  @Get(':id')
  @UseInterceptors(LicenseInterceptor)
  async findOne(
    @IdAndQuery(ValidateAndTransformPipe) params: GetQueryDTO,
  ): Promise<BrandEntity | void> {
    return await this.#brandsService.findById(params.id);
  }
}
