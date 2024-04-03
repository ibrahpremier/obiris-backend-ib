import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) 
    private readonly rolesRepository: Repository<Role>,
  ) {}


  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(newRole); 
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const existingRole = await this.findOne(id); 
    const updatedRole = { ...existingRole, ...updateRoleDto };
    return await this.rolesRepository.save(updatedRole);
  }

  async remove(id: number): Promise<void> {
    const existingRole = await this.findOne(id);
    await this.rolesRepository.remove(existingRole);
  }
}
