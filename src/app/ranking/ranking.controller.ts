import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { LicensedDTO, LicensedDTODecorator } from 'src/decorators/licensedDTO.decorator';
import { BrandScore, BrandScoreEntity } from 'src/entities/brandScore.entity';
import { LicenseInterceptor } from 'src/interceptors/license.interceptor';
import { SearchQueryDTO, SearchQuerySchema } from './dto/searchQuery.dto';
import { RankingService } from './ranking.service';

@ApiTags('ranking')
@Controller('ranking')
@ApiExtraModels(LicensedDTO, BrandScore)
export class RankingController {
  readonly #rankingService: RankingService;

  constructor(rankingService: RankingService) {
    this.#rankingService = rankingService;
  }

  @Get()
  @SearchQuerySchema()
  @LicensedDTODecorator([BrandScore])
  @UseInterceptors(LicenseInterceptor)
  async all(@Query() query: SearchQueryDTO): Promise<BrandScoreEntity[]> {
    const yearMonth =
      query.yearMonth || (await this.#rankingService.getNewestYearMonth());
    if (query.areaType === 'area') {
      if (!Number.isInteger(query.areaId)) {
        throw new BadRequestException(
          'areaTypeに`area`を指定する場合はareaId（地域ID）も指定してください',
        );
      }
      return this.#rankingService.selectArea(yearMonth, query.areaId);
    } else {
      return this.#rankingService.selectAll(yearMonth);
    }
  }
}
