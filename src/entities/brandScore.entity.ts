import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AreaEntity } from "./area.entity";
import { BrandEntity } from "./brand.entity";

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

  @OneToOne(() => BrandEntity, (brand) => brand.id)
  @JoinColumn()
  readonly brand!: BrandEntity;
}
