import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'area',
})
export class AreaEntity {
  @PrimaryColumn()
  readonly id!: number;

  @CreateDateColumn({ select: false })
  readonly createdAt?: Date;

  @Column()
  readonly name!: string;
}
