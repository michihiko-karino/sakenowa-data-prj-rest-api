import { ApiProperty } from '@nestjs/swagger';
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

export class FlavorTag extends FlavorTagEntity{
  @ApiProperty({ example: '2' })
  id: number;

  @ApiProperty({ example: '酸味' })
  tag: string;
}
