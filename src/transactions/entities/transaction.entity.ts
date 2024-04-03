import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Solde } from 'src/soldes/entities/solde.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Solde, (solde) => solde.transactions, { cascade: true })
  solde: Solde;

  @Column()
  @ApiProperty()
  montant: number;

  @Column()
  @ApiProperty()
  type: string;

  @Column({ name: 'ancien_solde' })
  @ApiProperty()
  ancienSolde: string;

  @Column({ name: 'nouveau_solde' })
  @ApiProperty()
  nouveauSolde: string;

  @Column({ type: 'enum', enum: ['En Attente', 'Rejeté', 'Approuvé'] })
  @ApiProperty()
  etat: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
