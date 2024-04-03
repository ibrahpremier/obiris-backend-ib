import { Injectable } from '@nestjs/common';
import { CreateFormuleDto } from './dto/create-formule.dto';
import { UpdateFormuleDto } from './dto/update-formule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Formule } from './entities/formule.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/baseService';

@Injectable()
export class FormulesService {
  constructor(@InjectRepository(Formule) readonly formuleRepository: Repository<Formule>) {}

  private readonly baseService = BaseService<Formule, CreateFormuleDto, UpdateFormuleDto>(this.formuleRepository);
  async create(createFormuleDto: CreateFormuleDto): Promise<Formule> {
    return await this.baseService.create(createFormuleDto);
  }

  async findAll(): Promise<Formule[]> {
    return await this.baseService.findAll();
  }

  async findOne(id: number): Promise<Formule> {
    return await this.baseService.findOne({ where: { id } });
  }

  async update(id: number, updateFormuleDto: UpdateFormuleDto): Promise<Formule> {
    return await this.baseService.update({ where: { id } }, updateFormuleDto);
  }

  async remove(id: number): Promise<void> {
    return await this.baseService.remove({ where: { id } });
  }
}
