import { Module } from '@nestjs/common';
import { ParisService } from './paris.service';
import { ParisController } from './paris.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paris } from './entities/paris.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paris])],
  controllers: [ParisController],
  providers: [ParisService],
})
export class ParisModule {}
