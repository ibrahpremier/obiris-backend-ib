import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateSoldeDto {
    @IsNotEmpty()
    @ApiProperty()
    user: number;

    @IsNumber()
    @ApiProperty()
    solde: number;

    @IsNumber()
    @ApiProperty()
    gains: number;

    @ApiProperty()
    bonus: number;

    @ApiProperty()
    @IsNumber()
    reserve: number;

    @ApiProperty()
    @IsBoolean({ message: 'Le champ est obligatoire' })
    status: boolean;
}
