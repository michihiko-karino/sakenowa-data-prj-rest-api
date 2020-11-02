import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandScoreEntity } from 'src/entities/brandScore.entity';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandScoreEntity])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
