import { Module } from '@nestjs/common';
import { ParrainagesService } from './parrainages.service';
import { ParrainagesController } from './parrainages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parrainage } from './entities/parrainage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parrainage])],
  controllers: [ParrainagesController],
  providers: [ParrainagesService],
  exports: [ParrainagesService],
})
export class ParrainagesModule {}
