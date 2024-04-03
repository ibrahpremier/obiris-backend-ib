import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GenerateCodeDto {
    @IsNotEmpty()
    @ApiProperty()
    parrainId : number

    
    @ApiProperty()
    role : string

}
