import { ApiProperty } from '@nestjs/swagger';
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

export class Area extends AreaEntity {
  @ApiProperty({ example: '5' })
  id: number;

  @ApiProperty({ example: '秋田県' })
  name: string;
}
