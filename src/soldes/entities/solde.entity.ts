import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Entity()
export class Solde {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  solde: number;

  @Column({ default: 0 })
  gains: number;

  @Column({ default: 0 })
  bonus: number;

  @Column({ default: 0 })
  reserve: number;

  @Column({name:'user_id'})
  @OneToOne(() => User)
  user: number;

  @OneToMany(() => Transaction, (transaction) => transaction.solde)
  transactions: Transaction[];

  @Column()
  status: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
