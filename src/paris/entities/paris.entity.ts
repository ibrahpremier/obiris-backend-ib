import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Formule } from 'src/formules/entities/formule.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum typePari{
  doubleChance="Double Chance",
  normale= "Normale"
}
@Entity()
export class Paris {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  combinaison: string;

  @Column()
  @ApiProperty()
  type: typePari;

  @ManyToOne(() => Coupon)
  @JoinColumn({ name: 'coupon_id' })
  coupon: Coupon;

  @ManyToOne(() => Formule)
  @JoinColumn({ name: 'formule_id' })
  formule: Formule;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
