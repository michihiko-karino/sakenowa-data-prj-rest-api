import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlavorTagEntity } from 'src/entities/flavorTag.entity';
import { FlavorTagsController } from './flavor-tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FlavorTagEntity])],
  controllers: [FlavorTagsController],
})
export class FlavorTagsModule {}
