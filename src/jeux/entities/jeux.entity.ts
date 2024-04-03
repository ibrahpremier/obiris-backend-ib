import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Jeu {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  nom: string;
  
  @Column()
  @ApiProperty()
  jour:string

  @Column({ name: 'date_tirage', type: 'timestamp' })
  @ApiProperty()
  dateTirage: Date;

  @Column({ name: 'date_fin' })
  @ApiProperty()
  dateFin: Date;

  @Column({ name: 'turbo_1' })
  @ApiProperty()
  turbo1: boolean;

  @Column({ name: 'turbo_2' })
  @ApiProperty()
  turbo2: boolean;

  @Column({ name: 'turbo_3' })
  @ApiProperty()
  turbo3: boolean;

  @Column({ name: 'turbo_4' })
  @ApiProperty()
  turbo4: boolean;

  @Column({ name: 'double_chance' })
  @ApiProperty()
  doubleChance: boolean;

  @Column({ name: 'p_poto' })
  @ApiProperty()
  pPoto: boolean;

  @Column({ name: 'plafond_t_1' })
  @ApiProperty()
  plafondT1: number;

  @Column({ name: 'plafond_t_2' })
  @ApiProperty()
  plafondT2: number;

  @Column({ name: 'plafond_t_3' })
  @ApiProperty()
  plafondT3: number;

  @Column({ name: 'plafond_t_4' })
  @ApiProperty()
  plafondT4: number;

  @Column({ name: 'plafond_1to90' })
  @ApiProperty()
  plafond1to90: number;

  @Column({ name: 'plafond_1to90_pp' })
  @ApiProperty()
  plafond1to90pp: number;

  @Column({ name: 'plafond_2sure' })
  @ApiProperty()
  plafond2sure: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
