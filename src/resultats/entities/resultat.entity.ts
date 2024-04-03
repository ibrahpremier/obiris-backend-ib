import { Jeu } from 'src/jeux/entities/jeux.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Resultat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Jeu)
  @JoinColumn({ name: 'jeu_id' })
  jeu: Jeu;

  @Column()
  mac: string;

  @Column()
  win: string;
}
