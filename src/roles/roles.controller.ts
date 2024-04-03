import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiNotFoundResponse, ApiBody, ApiOperation, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creation d\'un nouveau rôle' })
  @ApiCreatedResponse({
    description: 'Le rôle a été creer avec succès ',
    type: Role,
    schema: {
      example: { id: 1, name: 'Admin', status: true }
    }
  }) @ApiBadRequestResponse({ description: 'Impossible de créer un rôle' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role | string> {
    try {
      return this.rolesService.create(createRoleDto);
    } catch (error) {
      throw new BadRequestException('Impossible de créer un rôle');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liste de tous les rôles' })
  @ApiOkResponse({ description: 'Liste de tous les rôles', type: [Role] })
  async findAll(): Promise<Role[]> {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperer un rôle par son ID' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Role details', type: Role })
  @ApiNotFoundResponse({ description: 'Rôle non trouvé !' })
  async findOne(@Param('id') id: string): Promise<Role | string> {
    try {
      const role = this.rolesService.findOne(+id);
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
  @ApiOperation({ summary: 'Modification d\'un rôle par son ID' })
  @ApiOkResponse({ description: 'Le rôle a été modifié avec succès', type: Role })
  @ApiNotFoundResponse({ description: 'Rôle non trouvé' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async update(@Param('id') id: string, @Param('nom') nom: string,
    @Param('status') status: boolean, @Body() updateRoleDto: UpdateRoleDto): Promise<Role | string> {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suppression d\'un nouveau rôle par son ID' })
  @ApiOkResponse({ description: 'Le rôle a été supprimé avec succès', type: Role })
  @ApiNotFoundResponse({ description: 'Rôle non trouvé' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.rolesService.remove(+id);
    } catch (error) {
      throw new NotFoundException(`Rôle avec l'id ${id} introuvable `);
    }
  }
}
