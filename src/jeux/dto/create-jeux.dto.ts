import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateJeuxDto {
  @IsNotEmpty()
  @ApiProperty()
  nom: string;

  @IsString()
  @ApiProperty()
  jour : string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  dateTirage: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  dateFin: Date;

  @IsBoolean()
  @ApiProperty()
  turbo1: boolean;

  @IsBoolean()
  @ApiProperty()
  turbo2: boolean;

  @IsBoolean()
  @ApiProperty()
  turbo3: boolean;

  @IsBoolean()
  @ApiProperty()
  turbo4: boolean;

  @IsBoolean()
  @ApiProperty()
  doubleChance: boolean;

  @IsBoolean()
  @ApiProperty()
  pPoto: boolean;

  @IsNumber()
  @ApiProperty()
  plafondT1: number;

  @IsNumber()
  @ApiProperty()
  plafondT2: number;

  @IsNumber()
  @ApiProperty()
  plafondT3: number;

  @IsNumber()
  @ApiProperty()
  plafondT4: number;

  @IsNumber()
  @ApiProperty()
  plafond1to90: number;

  @IsNumber()
  @ApiProperty()
  plafond1to90pp: number;

  @IsNumber()
  @ApiProperty()
  plafond2sure: number;
}

