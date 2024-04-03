import { Module } from '@nestjs/common';
import { SoldesService } from './soldes.service';
import { SoldesController } from './soldes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solde } from './entities/solde.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solde])],
  controllers: [SoldesController],
  providers: [SoldesService],
  exports: [SoldesService]
})
export class SoldesModule {}
