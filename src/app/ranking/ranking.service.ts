import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandScoreEntity } from 'src/entities/brandScore.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class RankingService {
  readonly #BrandScoreRepository: Repository<BrandScoreEntity>;

  constructor(
    @InjectRepository(BrandScoreEntity)
    BrandScoreRepository: Repository<BrandScoreEntity>,
  ) {
    this.#BrandScoreRepository = BrandScoreRepository;
  }

  // entity定義でselect:falseなカラムと自動生成id以外を選択する
  private selects(): (keyof BrandScoreEntity)[] {
    return this.#BrandScoreRepository.metadata.ownColumns
      .filter((column) => column.isSelect)
      .map((column) => column.propertyName)
      .filter((name) => name !== 'id') as (keyof BrandScoreEntity)[];
  }

  selectAll(yearMonth: string): Promise<BrandScoreEntity[]> {
    return this.#BrandScoreRepository.find({
      where: { allRank: Not(IsNull()), yearMonth },
      order: { allRank: 'ASC' },
      select: this.selects(),
      relations: ['area', 'brand'],
    });
  }

  selectArea(yearMonth: string, areaId: number): Promise<BrandScoreEntity[]> {
    return this.#BrandScoreRepository.find({
      where: { area: areaId, yearMonth },
      order: { areaRank: 'ASC' },
      select: this.selects(),
      relations: ['area', 'brand'],
    });
  }

  async getNewestYearMonth(): Promise<string> {
    const newestOne = await this.#BrandScoreRepository.findOne({
      order: { createdAt: 'DESC' },
    });
    return newestOne.yearMonth;
  }
}
