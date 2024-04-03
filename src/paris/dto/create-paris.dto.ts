import { IsNotEmpty, IsEnum, IsNumber, IsPositive, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { typePari } from '../entities/paris.entity';

export class CreateParisDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255, { message: 'La combinaison doit avoir au maximum 255 caractères' })
  combinaison: string;

  @ApiProperty({ enum: typePari, enumName: 'TypePari' })
  @IsEnum(typePari, { message: 'Le type de pari doit être soit "Double Chance" ou "Normale"' })
  type: typePari;

  @ApiProperty()
  @IsNumber({}, { message: 'L\'ID du coupon doit être un nombre' })
  @IsPositive({ message: 'L\'ID du coupon doit être un nombre positif' })
  couponId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'L\'ID de la formule doit être un nombre' })
  @IsPositive({ message: 'L\'ID de la formule doit être un nombre positif' })
  formuleId: number;
}
