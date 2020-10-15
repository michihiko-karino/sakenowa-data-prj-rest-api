import { AreaEntity } from './area.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BrandEntity } from "./brand.entity";

@Entity({
  name: 'brewery',
})
export class BreweryEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @CreateDateColumn({ select: false })
  readonly createdAt?: Date;

  @Column()
  readonly name!: string;

  @OneToMany(() => BrandEntity, (brand) => brand.id)
  readonly brands!: BrandEntity[];

  @ManyToOne(() => AreaEntity, (area) => area.id)
  readonly area!: AreaEntity;
}
