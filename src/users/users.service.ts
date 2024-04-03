import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParrainagesService } from 'src/parrainages/parrainages.service';
import * as bcrypt from 'bcrypt';
import { SoldesService } from 'src/soldes/soldes.service';
import { CreateSoldeDto } from 'src/soldes/dto/create-solde.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly parrainageService: ParrainagesService,
    private readonly soldeService: SoldesService,
  ) { }

  async findByCode(code: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { code } });
  }

  async create(createUserDto: CreateUserDto, role: string): Promise<User> {
    const parrainage = await this.parrainageService.generateRandomCode(
      createUserDto.parrainId,
      role
    );
    let code: number;
    do {
      code = this.generateUniqueCode();
    } while (await this.findByCode(code));

    createUserDto.code = code;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    if (parrainage.role) {
      createUserDto.role = role;
    }
    const newUser = { ...createUserDto, password: hashedPassword };
    const createdUser = await this.userRepository.save(newUser);
    await this.parrainageService.updateUserAndStatus(parrainage.code, createdUser.id);
    const createSoldeDto: CreateSoldeDto = {
      user: createdUser.id,
      solde: 0,
      gains: 0,
      bonus: 0,
      reserve: 0,
      status: true,
    };
    await this.soldeService.create(createSoldeDto);
  
    return createdUser;
  }

  private generateUniqueCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async findAll():Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser= await this.findOne(id); 
    const updatedUser = { ...existingUser, ...updateUserDto };
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const existingUser = await this.findOne(id);
    await this.userRepository.remove(existingUser);
  }
}
