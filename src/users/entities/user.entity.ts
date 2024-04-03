import { Coupon } from 'src/coupons/entities/coupon.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  email: string;

  @Column()
  pays: string;

  @Column()
  ville: string;

  @Column()
  contact: string;

  @Column()
  password: string;

  @Column({ name: 'user_parrain_id', nullable: true })
  userParrainId: number;

  @Column({ name: 'role' })
  role: string;

  @Column({default:true})
  status: boolean;

  @OneToMany(() => Coupon, coupon => coupon.user)
  coupons: Coupon[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
  
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
  
}
