import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FormulesService } from './formules.service';
import { CreateFormuleDto } from './dto/create-formule.dto';
import { UpdateFormuleDto } from './dto/update-formule.dto';
import { Formule } from './entities/formule.entity';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Formules')
@Controller('formules')
export class FormulesController {
  constructor(private readonly formulesService: FormulesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creation d\'une nouvelle formule' })

  async create(@Body() createFormuleDto: CreateFormuleDto): Promise<Formule> {
    return await this.formulesService.create(createFormuleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liste de toutes les formules' })
  @ApiOkResponse({ description: 'Liste de toutes les formules', type: [Formule] })

  async findAll(): Promise<Formule[]> {
    return await this.formulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperer une formule par son ID' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Formule details', type: Formule })
  @ApiNotFoundResponse({ description: 'Formule non trouvé !' })

  async findOne(@Param('id') id: string): Promise<Formule> {
    return await this.formulesService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Modification d\'une formule par son ID' })
  @ApiOkResponse({ description: 'La formule a été modifié avec succès', type: Formule })
  @ApiNotFoundResponse({ description: 'Formule non trouvé' })
  @ApiBadRequestResponse({ description: 'Bad request' })

  async update(@Param('id') id: string, @Body() updateFormuleDto: UpdateFormuleDto): Promise<Formule> {
    return await this.formulesService.update(+id, updateFormuleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suppression d\'une formule par son ID' })
  @ApiOkResponse({ description: 'La formule a été supprimé avec succès', type: Formule })
  @ApiNotFoundResponse({ description: 'Formule non trouvé' })

  async remove(@Param('id') id: string): Promise<void> {
    return await this.formulesService.remove(+id);
  }
}
