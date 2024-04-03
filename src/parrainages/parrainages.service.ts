import { Injectable } from '@nestjs/common';
import { CreateParrainageDto } from './dto/create-parrainage.dto';
import { UpdateParrainageDto } from './dto/update-parrainage.dto';
import { BaseService } from 'src/base/baseService';
import { Parrainage } from './entities/parrainage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParrainagesService {
  constructor(@InjectRepository(Parrainage) readonly parrainageRepository: Repository<Parrainage>) {}
  private readonly baseService = BaseService<Parrainage, CreateParrainageDto, UpdateParrainageDto>(this.parrainageRepository);

  async create(createParrainageDto: CreateParrainageDto): Promise<Parrainage> {
    return await this.baseService.create(createParrainageDto);
  }

  async findAll(): Promise<Parrainage[]> {
    return await this.baseService.findAll();
  }

  async findOne(id: number): Promise<Parrainage> {
    return await this.baseService.findOne({ where: { id } });
  }

  async update(id: number, updateParrainageDto: UpdateParrainageDto): Promise<Parrainage> {
    return await this.baseService.update({ where: { id } }, updateParrainageDto);
  }

  async remove(id: number): Promise<void> {
    return await this.baseService.remove({ where: { id } });
  }
  async generateRandomCode(parrainId: number, role?: string): Promise<Parrainage> {

    const existingParrainage = await this.baseService.findOneBy( { where: { parrainId, status: false, role } });
  
    if (existingParrainage) {
      return existingParrainage;
    } else {

      const newParrainage = new Parrainage();
      newParrainage.code = Math.floor(1000 + Math.random() * 9000);
      newParrainage.role = role;
      newParrainage.parrainId = parrainId;
      newParrainage.status = false;
      const createdParrainage = await this.baseService.create(newParrainage);
      return createdParrainage;
    }
}

async updateUserAndStatus(code:number,userId: number): Promise<void> {
  const parrainage = await this.baseService.findOneBy({ where: { code, status: false } });
  
  if (parrainage) {
    parrainage.status = true;
    parrainage.userId = userId;
    await this.parrainageRepository.save(parrainage);
  }
} 
}
