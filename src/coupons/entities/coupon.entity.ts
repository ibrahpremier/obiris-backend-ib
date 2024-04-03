import { ApiProperty } from '@nestjs/swagger';
import { Paris } from 'src/paris/entities/paris.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: number;

  @ManyToOne(() => User, user => user.coupons)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Paris, pari => pari.coupon)
  paris: Paris[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

