import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialsDto {

    @ApiProperty()
    code: number

    @ApiProperty()
    password: string
}