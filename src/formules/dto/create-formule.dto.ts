import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateFormuleDto {
    
    @IsNotEmpty()
    @ApiProperty()
    nom: string;
}
