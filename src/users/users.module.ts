import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ParrainagesModule } from 'src/parrainages/parrainages.module';
import { SoldesModule } from 'src/soldes/soldes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),ParrainagesModule,SoldesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
