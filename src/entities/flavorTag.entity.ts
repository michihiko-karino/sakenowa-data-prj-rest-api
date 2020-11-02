import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'flavor_tag',
})
export class FlavorTagEntity {
  @PrimaryColumn()
  readonly id!: number;

  @CreateDateColumn({ select: false })
  readonly createdAt?: Date;

  @Column()
  readonly tag!: string;
}
