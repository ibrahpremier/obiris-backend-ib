import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParisDto } from './dto/create-paris.dto';
import { UpdateParisDto } from './dto/update-paris.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paris } from './entities/paris.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/baseService';

@Injectable()
export class ParisService {
  constructor(@InjectRepository(Paris)  readonly pariRepository: Repository<Paris>) {}

  private readonly baseService=BaseService<Paris,CreateParisDto,UpdateParisDto>(this.pariRepository);

  async create(createParisDto: CreateParisDto):Promise <Paris> {
    return await this.baseService.create(createParisDto);
  }

  async findAll():Promise<Paris[]> {
    return await this.baseService.findAll();
  }

  async findOne(id: number):Promise<Paris> {
    return  await this.baseService.findOne({ where: { id } });
  }

 async update(id: number, updateParisDto: UpdateParisDto):Promise<Paris> {
    return await  this.baseService.update({ where: { id } },updateParisDto);
  }

 async remove(id: number) {
    return await  this.baseService.remove({ where: { id } });
  }


}
