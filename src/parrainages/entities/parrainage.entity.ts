import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  IsNull,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Parrainage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  code: number;

  @Column({name:"user_id",nullable:true})
  @ApiProperty()
  userId: string;

  @Column({name:"parrain_id"})
  @ApiProperty()
  parrainId: number;

  @Column()
  @ApiProperty()
  role:String;

  @Column()
  @ApiProperty({default:false})
  status: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
