import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { BrandScoreEntity } from 'src/entities/brandScore.entity';
import { SearchQueryDTO } from './dto/searchQuery.dto';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  readonly #rankingService: RankingService;

  constructor(rankingService: RankingService) {
    this.#rankingService = rankingService;
  }

  @Get()
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
