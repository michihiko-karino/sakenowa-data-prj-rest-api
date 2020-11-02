import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreasModule } from './app/areas/areas.module';
import { BrandsModule } from './app/brands/brands.module';
import { BreweriesModule } from './app/breweries/breweries.module';
import { FlavorTagsModule } from './app/flavor-tags/flavor-tags.module';
import { RankingModule } from './app/ranking/ranking.module';
import { environmentVariables } from './config/environmentVariables';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVariables],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    LoggerModule,
    BrandsModule,
    BreweriesModule,
    AreasModule,
    FlavorTagsModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
