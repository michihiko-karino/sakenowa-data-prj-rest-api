import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Area, AreaEntity } from './area.entity';
import { OnlyBrand, BrandEntity } from './brand.entity';

@Entity({
  name: 'brewery',
})
export class BreweryEntity {
  @PrimaryColumn()
  readonly id!: number;

  @CreateDateColumn({ select: false })
  readonly createdAt?: Date;

  @Column()
  readonly name!: string;

  @OneToMany(() => BrandEntity, (brand) => brand.brewery)
  readonly brands!: BrandEntity[];

  @ManyToOne(() => AreaEntity, (area) => area.id)
  readonly area!: AreaEntity;
}

export class OnlyBrewery extends BreweryEntity {
  @ApiProperty({ example: '76' })
  id: number;

  @ApiProperty({ example: '新政酒造' })
  name: string;
}

export class BreweryList extends OnlyBrewery {
  @ApiProperty({ type: Area })
  area: AreaEntity;
}

export class BreweryDetail extends BreweryList {
  // HELP うまくいかないよぉ😢
  @ApiProperty({ items: { $ref: getSchemaPath(OnlyBrand) } })
  brands: BrandEntity[];
}
