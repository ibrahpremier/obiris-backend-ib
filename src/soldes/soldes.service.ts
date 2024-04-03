import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateSoldeDto } from './dto/create-solde.dto';
import { UpdateSoldeDto } from './dto/update-solde.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solde } from './entities/solde.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/baseService';

@Injectable()
export class SoldesService {

  constructor(@InjectRepository(Solde) private readonly soldesRepository: Repository<Solde>) { }

  private readonly baseService = BaseService<Solde, CreateSoldeDto, UpdateSoldeDto>(this.soldesRepository);


  async create(createSoldeDto: CreateSoldeDto): Promise<Solde> {
    return await this.baseService.create(createSoldeDto);
  }

  async findAll(): Promise<Solde[]> {
    return await this.baseService.findAll();
  }

  async findOne(id: number): Promise<Solde | undefined> {
    const result = await this.baseService.findOne({ where: { id } });
    if (!result) throw new Error('Solde Non Trouvé');
    return result;
  }

  async update(id: number, updateSoldeDto: UpdateSoldeDto): Promise<Solde> {
    return await this.baseService.update({ where: { id } }, updateSoldeDto);
  }

  async remove(id: number): Promise<void> {
    const solde = await this.findOne(id);
    if (!solde) throw new Error("Le solde n'existe pas");

    let transactions = solde.transactions;
    if (transactions && transactions.length > 0) {
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].etat == "en attente") {
          throw new BadRequestException(`Impossible de supprimer un solde qui est en attente d'une transaction`);
          throw new ConflictException(`Impossible de supprimer un solde en cours d\'utilisation`);
        }
      }

    }

    await this.baseService.remove({ where: { id } });
  }
}