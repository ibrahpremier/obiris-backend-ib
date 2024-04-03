import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nom: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    status: boolean = true;

}
