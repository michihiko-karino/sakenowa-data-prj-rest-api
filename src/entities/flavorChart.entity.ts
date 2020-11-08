import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BrandEntity } from './brand.entity';

@Entity({
  name: 'flavor_chart',
})
export class FlavorChartEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @OneToOne(() => BrandEntity, (brand) => brand.id)
  @JoinColumn()
  readonly brand!: BrandEntity;

  @CreateDateColumn({ select: false })
  readonly createdAt?: Date;

  @Column('double')
  readonly fruity!: number;

  @Column('double')
  readonly mellow!: number;

  @Column('double')
  readonly rich!: number;

  @Column('double')
  readonly soft!: number;

  @Column('double')
  readonly dry!: number;

  @Column('double')
  readonly light!: number;
}

export class FlavorChart extends FlavorChartEntity {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: '0.530785420673603' })
  fruity: number;

  @ApiProperty({ example: '0.422885095022818' })
  mellow: number;

  @ApiProperty({ example: '0.280154068716765' })
  rich: number;

  @ApiProperty({ example: '0.301877237796703' })
  soft: number;

  @ApiProperty({ example: '0.237384379935496' })
  dry: number;

  @ApiProperty({ example: '0.559881702551713' })
  light: number;
}
