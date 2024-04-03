import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { ParrainagesModule } from 'src/parrainages/parrainages.module'; 
import { SoldesModule } from 'src/soldes/soldes.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Findel*007',
      signOptions: { expiresIn: '72h' },
    }),
    ParrainagesModule, 
    SoldesModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy,],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
