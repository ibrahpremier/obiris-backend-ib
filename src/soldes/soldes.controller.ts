import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SoldesService } from './soldes.service';
import { CreateSoldeDto } from './dto/create-solde.dto';
import { UpdateSoldeDto } from './dto/update-solde.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Soldes')
@Controller('soldes')
export class SoldesController {
  constructor(private readonly soldesService: SoldesService) {}

  @Post()
  create(@Body() createSoldeDto: CreateSoldeDto) {
    return this.soldesService.create(createSoldeDto);
  }

  @Get()
  findAll() {
    return this.soldesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.soldesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSoldeDto: UpdateSoldeDto) {
    return this.soldesService.update(+id, updateSoldeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.soldesService.remove(+id);
  }
}
