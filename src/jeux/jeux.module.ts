import { Module } from '@nestjs/common';
import { JeuxService } from './jeux.service';
import { JeuxController } from './jeux.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jeu } from './entities/jeux.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports :[ 
  TypeOrmModule.forFeature([Jeu]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
],
  controllers: [JeuxController],
  providers: [JeuxService],
})
export class JeuxModule {}
