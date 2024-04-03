import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResultatsService } from './resultats.service';
import { CreateResultatDto } from './dto/create-resultat.dto';
import { UpdateResultatDto } from './dto/update-resultat.dto';
import { ApiTags,ApiBody, ApiOperation, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Resultats')
@Controller('resultats')
export class ResultatsController {
  constructor(private readonly resultatsService: ResultatsService) {}

  @Post()
  create(@Body() createResultatDto: CreateResultatDto) {
    return this.resultatsService.create(createResultatDto);
  }

  @Get()
  findAll() {
    return this.resultatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultatDto: UpdateResultatDto) {
    return this.resultatsService.update(+id, updateResultatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultatsService.remove(+id);
  }
}
