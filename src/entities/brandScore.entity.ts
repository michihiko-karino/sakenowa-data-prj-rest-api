import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area, AreaEntity } from './area.entity';
import { BrandEntity, OnlyBrand } from './brand.entity';

@Entity({
  name: 'brand_score',
})
export class BrandScoreEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @CreateDateColumn({ select: false })
  readonly createdAt?: Date;

  @Column()
  readonly yearMonth!: string;

  @ManyToOne(() => AreaEntity, (area) => area.id)
  readonly area!: AreaEntity;

  @Column('double')
  @Index()
  readonly score!: number;

  @Column('int', { nullable: true })
  readonly allRank?: number;

  @Column('int', { nullable: true })
  readonly areaRank?: number;

  @OneToOne(() => BrandEntity, (brand) => brand.id)
  @JoinColumn()
  readonly brand!: BrandEntity;
}

export class BrandScore extends BrandScoreEntity {
  @ApiProperty({ example: '202009' })
  yearMonth: string;

  @ApiProperty({ type: Area })
  area: AreaEntity;

  @ApiProperty({ example: '4.41221904754639' })
  score: number;

  @ApiProperty({ example: '1' })
  allRank?: number;

  @ApiProperty({ example: '1' })
  areaRank?: number;

  @ApiProperty({ type: OnlyBrand })
  brand: BrandEntity;
}
