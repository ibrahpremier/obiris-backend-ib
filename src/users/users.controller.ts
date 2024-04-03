import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creation d\'un nouvel utilisateur' })
  async createUser(@Body() createUserDto: CreateUserDto, @Body('role') role: string): Promise<User> {
    return await this.usersService.create(createUserDto, role);
  }
  @Get()
  @ApiOperation({ summary: 'Liste des utilisateurs' })
  @ApiOkResponse({ description: 'Liste de tous les utilisateurs', type: [User] })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
  // async findAll(): Promise<any> {
  //       this.usersService.findAll().then((data)=>{
  //         return data;
  //       })
  //       .catch((error)=>{
  //         return {error: error.message};
  //       });
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperer un rôle par son ID' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Role details', type: User })
  @ApiNotFoundResponse({ description: 'Rôle non trouvé !' })
  async findOne(@Param('id') id: string): Promise<User | string> {
    try {
      const role = this.usersService.findOne(+id);
      if (!role) {
        throw new NotFoundException(`Role with id ${id} not found`);
      }
      return role;
    } catch (error) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Modification d\'un utilisateur par son ID' })
  @ApiOkResponse({ description: 'L utilisateur a été modifié avec succès', type: User })
  @ApiNotFoundResponse({ description: 'User non trouvé' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | string> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suppression d\'un utilisateur par son ID' })
  @ApiOkResponse({ description: 'L utilisateur a été supprimé avec succès', type: User })
  @ApiNotFoundResponse({ description: 'Rôle non trouvé' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.usersService.remove(+id);
    } catch (error) {
      throw new NotFoundException(`User avec l'id ${id} introuvable `);
    }
  }
}
