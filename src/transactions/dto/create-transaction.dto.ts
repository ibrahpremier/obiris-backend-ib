import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum TransactionState {
  PENDING = 'En Attente',
  REJECTED = 'Rejeté',
  APPROVED = 'Approuvé',
}
enum Type{
  RECHARGE= "Récharge",
  TRANSFERT="Transfert",
  GAIN="Gain",
  RETRAIT="Retrait",
  CONVERSION="Conversion"
};

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  soldeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  montant: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ancienSolde: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nouveauSolde: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type)
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransactionState)
  etat: TransactionState;
}
