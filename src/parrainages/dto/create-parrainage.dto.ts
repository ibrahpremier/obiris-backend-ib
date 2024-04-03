import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateParrainageDto {
    @IsNotEmpty()
    @ApiProperty()
    code: number;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    parrainId: number;
    
    @ApiProperty()
    role:String;

    @ApiProperty({default:false})
    status: boolean;
}
