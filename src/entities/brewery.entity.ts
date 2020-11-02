import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { AreaEntity } from './area.entity';
import { BrandEntity } from './brand.entity';

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
