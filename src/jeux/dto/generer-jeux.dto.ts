import { PartialType } from "@nestjs/mapped-types";
import { CreateJeuxDto } from "./create-jeux.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GenererJeuxDto extends PartialType(CreateJeuxDto)  {
    @ApiProperty()
    semaines: number;
  }
