import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  prenom: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pays: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ville: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contact: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  parrainId:  number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
