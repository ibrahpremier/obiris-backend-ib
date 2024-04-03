import { Module } from '@nestjs/common';
import { ResultatsService } from './resultats.service';
import { ResultatsController } from './resultats.controller';

@Module({
  controllers: [ResultatsController],
  providers: [ResultatsService],
})
export class ResultatsModule {}
