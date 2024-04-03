import { Injectable } from '@nestjs/common';
import { CreateJeuxDto } from './dto/create-jeux.dto';
import { UpdateJeuxDto } from './dto/update-jeux.dto';
import { LessThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Jeu } from './entities/jeux.entity';
import { jeuSemaine } from './jeuSemaine';

@Injectable()
export class JeuxService {
  constructor(@InjectRepository(Jeu) private readonly jeuRepository: Repository<Jeu>,) { }

  async create(createJeuxDto: CreateJeuxDto): Promise<Jeu> {
    const newJeu = this.jeuRepository.create(createJeuxDto);
    return await this.jeuRepository.save(newJeu);
  }

  async findAll(): Promise<Jeu[]> {
    return await this.jeuRepository.find();
  }

  async findOne(id: number): Promise<Jeu> {
    return await this.jeuRepository.findOne({ where: { id } });
  }

  async update(id: number, updateJeuxDto: UpdateJeuxDto): Promise<Jeu> {
    const existingJeu = await this.findOne(id);
    const updatedJeu = { ...existingJeu, ...updateJeuxDto };
    return await this.jeuRepository.save(updatedJeu);
  }

  async remove(id: number): Promise<Jeu> {
    const existingJeu = await this.findOne(id);
    return await this.jeuRepository.remove(existingJeu);
  }

  async genererJeux(dateDebut?: Date): Promise<void> {
    if (!dateDebut) {
      dateDebut = new Date();
    }

    for (let i = 0; i < 14; i++) {
      const dateCourante: Date = new Date(dateDebut);
      dateCourante.setDate(dateCourante.getDate() + i);
      const jourActuel: number = dateCourante.getDay();

      for (const jeu of jeuSemaine) {
        if (jourActuel === this.getNumeroJour(jeu.jour)) {
          const dateTirage: Date = new Date(dateCourante);
          dateTirage.setHours(jeu.heureTirage.hours, jeu.heureTirage.minutes, jeu.heureTirage.seconds);

          const dateFin: Date = new Date(dateTirage);
          dateFin.setHours(jeu.heureFin.hours, jeu.heureFin.minutes, jeu.heureFin.seconds);

          const nouveauJeu: Jeu = {
            nom: jeu.nom,
            jour: jeu.jour,
            dateTirage: dateTirage,
            dateFin: dateFin,
            doubleChance: jeu.doubleChance,
            turbo1: jeu.turbo1,
            turbo2: jeu.turbo2,
            turbo3: jeu.turbo3,
            turbo4: jeu.turbo4,
            pPoto: jeu.pPoto,
            plafond1to90: jeu.plafond1to90,
            plafond1to90pp: jeu.plafond1to90pp,
            plafond2sure: jeu.plafond2sure,
            plafondT1: jeu.plafondT1,
            plafondT2: jeu.plafondT2,
            plafondT3: jeu.plafondT3,
            plafondT4: jeu.plafondT4,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: null
          };

          await this.jeuRepository.save(nouveauJeu);
        }
      }
    }

    console.log('Jeux générés et enregistrés avec succès !');
  }

  private getNumeroJour(nomJour: string): number {
    const nomsJours: string[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return nomsJours.indexOf(nomJour);
  }
  async tacheAutomatique(): Promise<void> {

    const dernierJeu: Jeu = await this.jeuRepository.findOne({
      order: { createdAt: 'DESC' } 
    })

    if (dernierJeu) {
      const dateFinDernierJeu: Date = new Date(dernierJeu.dateFin);
      const dateActuelle: Date = new Date();
      const differenceJours: number = Math.ceil((dateFinDernierJeu.getTime() - dateActuelle.getTime()) / (1000 * 3600 * 24));

      if (differenceJours < 6) {
        const dateDebut: Date = new Date(dateFinDernierJeu);
        dateDebut.setDate(dateDebut.getDate() + 1);
        await this.genererJeux(dateDebut);
      }
    } else {
      await this.genererJeux();
    }
  }
  async getJeuxDuJour(): Promise<Jeu[]> {
    const dateCourante = new Date();
    const dateSuivante = new Date(dateCourante);
    dateSuivante.setDate(dateSuivante.getDate() + 1);

    return await this.jeuRepository.find({
      where: {
        dateTirage: LessThanOrEqual(dateSuivante),
        // dateTirage: MoreThanOrEqual(dateCourante),
      }
    });
  }
}
