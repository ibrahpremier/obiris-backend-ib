import { Module } from '@nestjs/common';
import { FormulesService } from './formules.service';
import { FormulesController } from './formules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formule } from './entities/formule.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Formule])],
  controllers: [FormulesController],
  providers: [FormulesService],
})
export class FormulesModule {}
