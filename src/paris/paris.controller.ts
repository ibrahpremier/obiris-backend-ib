import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ParisService } from './paris.service';
import { CreateParisDto } from './dto/create-paris.dto';
import { UpdateParisDto } from './dto/update-paris.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paris } from './entities/paris.entity';

@ApiTags('Paris')
@Controller('paris')
export class ParisController {
  constructor(private readonly parisService: ParisService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creation d\'un nouveau paris' })

  create(@Body() createParisDto: CreateParisDto):Promise<Paris> {
    return this.parisService.create(createParisDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liste de tous les paris' })
  @ApiOkResponse({ description: 'Liste de tous les paris', type: [Paris] })

 
  findAll():Promise<Paris[]> {
    return this.parisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperer un paris par son ID' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'paris details', type: Paris })
  @ApiNotFoundResponse({ description: 'paris non trouvé !' })

  findOne(@Param('id') id: string) {
    return this.parisService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Modification d\'un paris par son ID' })
  @ApiOkResponse({ description: 'Le paris a été modifié avec succès', type: Paris })
  @ApiNotFoundResponse({ description: 'paris non trouvé' })
  @ApiBadRequestResponse({ description: 'Bad request' })

  async update(@Param('id') id: string, @Body() updateParisDto: UpdateParisDto) {
    return await this.parisService.update(+id, updateParisDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suppression d\'un pari par son ID' })
  @ApiOkResponse({ description: 'Le pari a été supprimé avec succès', type: Paris })
  @ApiNotFoundResponse({ description: 'Pari non trouvé' })

  remove(@Param('id') id: string):Promise<void> {
    return this.parisService.remove(+id);
  }
}
