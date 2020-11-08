import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BreweryEntity, OnlyBrewery } from './brewery.entity';
import { FlavorChart, FlavorChartEntity } from './flavorChart.entity';
import { FlavorTag, FlavorTagEntity } from './flavorTag.entity';

@Entity({
  name: 'brand',
})
export class BrandEntity {
  @PrimaryColumn()
  readonly id!: number;

  @CreateDateColumn({ select: false })
  readonly createdAt?: Date;

  @Column()
  readonly name!: string;

  @ManyToOne(() => BreweryEntity, (brewery) => brewery.brands)
  readonly brewery?: BreweryEntity;

  @ManyToMany(() => FlavorTagEntity)
  @JoinTable({
    name: 'brand_flavor_tag',
    joinColumn: {
      name: 'brandId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'flavorTagId',
      referencedColumnName: 'id',
    },
  })
  readonly flavorTags: FlavorTagEntity[];

  @OneToOne(() => FlavorChartEntity, (flavorChart) => flavorChart.brand)
  readonly flavorChart!: FlavorChartEntity;
}

export class OnlyBrand extends BrandEntity {
  @ApiProperty({ example: '109' })
  id: number;

  @ApiProperty({ example: '新政' })
  name: string;
}

export class BrandList extends OnlyBrand {
  @ApiProperty({ type: OnlyBrewery })
  brewery: BreweryEntity;
}

export class BrandDetail extends BrandList {
  @ApiProperty({ type: FlavorTag })
  flavorTags: FlavorTagEntity[];

  @ApiProperty({ type: FlavorChart })
  flavorChart: FlavorChartEntity;
}
