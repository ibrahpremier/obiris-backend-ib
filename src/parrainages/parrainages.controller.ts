import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ParrainagesService } from './parrainages.service';
import { CreateParrainageDto } from './dto/create-parrainage.dto';
import { UpdateParrainageDto } from './dto/update-parrainage.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Parrainage } from './entities/parrainage.entity';
import { GenerateCodeDto } from './dto/generer-code.dto';

@ApiTags('Parrainages')
@Controller('parrainages')
export class ParrainagesController {
  constructor(private readonly parrainagesService: ParrainagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creation d\'un nouveau Parrainage' })

  async create(@Body() createParrainageDto: CreateParrainageDto): Promise<Parrainage> {
    return await this.parrainagesService.create(createParrainageDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liste de tous les parrainages' })
  @ApiOkResponse({ description: 'Liste de tous les parrainages', type: [Parrainage] })

  async findAll(): Promise<Parrainage[]> {
    return await this.parrainagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperer un Parrainage par son ID' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Parrainage details', type: Parrainage })
  @ApiNotFoundResponse({ description: 'Parrainage non trouvé !' })

  async findOne(@Param('id') id: string): Promise<Parrainage> {
    return await this.parrainagesService.findOne(+id);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Modification d\'un Parrainage par son ID' })
  @ApiOkResponse({ description: 'Le parrainage a été modifié avec succès', type: Parrainage })
  @ApiNotFoundResponse({ description: 'Parrainage non trouvé' })
  @ApiBadRequestResponse({ description: 'Bad request' })

  async update(@Param('id') id: string, @Body() updateParrainageDto: UpdateParrainageDto): Promise<Parrainage> {
    return await this.parrainagesService.update(+id, updateParrainageDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suppression d\'un Parrainage par son ID' })
  @ApiOkResponse({ description: 'Le parrainage a été supprimé avec succès', type: Parrainage })
  @ApiNotFoundResponse({ description: 'Parrainage non trouvé' })

  async remove(@Param('id') id: string): Promise<void> {
    return await this.parrainagesService.remove(+id);
  }

  @Post("/generate-code")
  @ApiOperation({ summary: 'Verification de code et génération' })
  @ApiOkResponse({ description: 'Le code parrainage a été crée avec succès', type: Parrainage })
  async generateRandomCode(@Body() generateCodeDto: GenerateCodeDto): Promise<Parrainage> {
    const { parrainId,  role } = generateCodeDto;
    return await this.parrainagesService.generateRandomCode(parrainId, role);
  }
    
}
