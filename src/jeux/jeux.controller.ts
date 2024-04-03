import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, BadRequestException, UseGuards } from '@nestjs/common';
import { JeuxService } from './jeux.service';
import { CreateJeuxDto } from './dto/create-jeux.dto';
import { UpdateJeuxDto } from './dto/update-jeux.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Jeu } from './entities/jeux.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Jeux')
@Controller('jeux')
@UseGuards(AuthGuard())

export class JeuxController {
  constructor(private readonly jeuxService: JeuxService) {}
 
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creation d\'un nouveau jeu' })
  async create(@Body() createJeuxDto: CreateJeuxDto):Promise <Jeu | String> {
    try{
    return this.jeuxService.create(createJeuxDto);
  }catch(error){
    throw new BadRequestException(error);
  }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liste de tous les Jeux' })
  @ApiOkResponse({ description: 'Liste de tous les jeux', type: [Jeu] })
  findAll(): Promise<Jeu[]> {
    return  this.jeuxService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperer un jeu par son ID' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'jeu details', type: Jeu })
  @ApiNotFoundResponse({ description: 'Rôle non trouvé !' })
  findOne(@Param('id') id: string) {
    return this.jeuxService.findOne(+id);
  }

  @Patch(':id')

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Modification d\'un jeu par son ID' })
  @ApiOkResponse({ description: 'Le jeu a été modifié avec succès', type: Jeu })
  @ApiNotFoundResponse({ description: 'Jeu non trouvé' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  update(@Param('id') id: string, @Body() updateJeuxDto: UpdateJeuxDto) {
    return this.jeuxService.update(+id, updateJeuxDto);
  }

  @Delete(':id')

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suppression d\'un nouveau jeu par son ID' })
  @ApiOkResponse({ description: 'Le jeu a été supprimé avec succès', type: Jeu })
  @ApiNotFoundResponse({ description: 'Jeu non trouvé' })
  
  remove(@Param('id') id: string) {
    return this.jeuxService.remove(+id);
  }
  @Post('generer')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Génération de jeu sur un nombre de semaine spécifiées' })
  @ApiOkResponse({ description: 'Jeu générer avec succès!' })

  async genererJeux(): Promise<void |string> {
    //const { semaines } = genererJeuxDto;
    await this.jeuxService.genererJeux();
    return 'Jeu généré avec succès!';
  }
  @Get('du-jour')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Afficher le jeu d\'aujourd\'ui et demain' })
  async getJeuxDuJour(): Promise<Jeu[]> {
    return this.jeuxService.getJeuxDuJour();
  }
  @Get('auto-gen')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Génération de jeu automatiquement lorqu\'il rest moins de 7 jours ' })
  @ApiOkResponse({ description: 'Jeu générer avec succès!' })
  async  autoGen():Promise<any>{
    return this.jeuxService.tacheAutomatique()
  }
}
