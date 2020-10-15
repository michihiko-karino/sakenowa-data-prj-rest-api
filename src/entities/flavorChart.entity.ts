import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BrandEntity } from "./brand.entity";

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