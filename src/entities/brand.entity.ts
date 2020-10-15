import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BreweryEntity } from "./brewery.entity";
import { FlavorTagEntity } from "./flavorTag.entity";

@Entity({
  name: 'brand',
})
export class BrandEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @CreateDateColumn({ select: false })
  readonly createdAt?: Date;

  @Column()
  readonly name!: string;

  @ManyToOne(() => BreweryEntity, (brewery) => brewery.id)
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
}