import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BreweryEntity } from 'src/entities/brewery.entity';
import { BreweriesController } from './breweries.controller';
import { BreweriesService } from './breweries.service';

@Module({
  imports: [TypeOrmModule.forFeature([BreweryEntity])],
  controllers: [BreweriesController],
  providers: [BreweriesService],
})
export class BreweriesModule {}
