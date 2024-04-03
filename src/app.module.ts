import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ResultatsModule } from './resultats/resultats.module';
import { FormulesModule } from './formules/formules.module';
import { ParisModule } from './paris/paris.module';
import { CouponsModule } from './coupons/coupons.module';
import { JeuxModule } from './jeux/jeux.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SoldesModule } from './soldes/soldes.module';
import { ParrainagesModule } from './parrainages/parrainages.module';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';


const ormOption: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '109.70.148.63',
  port: 3306,
  username: 'expertiz_1-90bet-backend',
  database: 'expertiz_1-90bet-backend',
  password: '1!DpYkNyMHT4',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  ssl: false
};
@Module({
  imports: [
    UsersModule,
    RolesModule,
    ParrainagesModule,
    SoldesModule,
    TransactionsModule,
    JeuxModule,
    CouponsModule,
    ParisModule,
    FormulesModule,
    ResultatsModule,
    TypeOrmModule.forRoot(ormOption),
    AuthModule,
    PassportModule,
  ],
  providers: [AuthMiddleware],
  exports: [AuthMiddleware],
})
export class AppModule {}
