import { PartialType } from '@nestjs/mapped-types';
import { CreateSoldeDto } from './create-solde.dto';

export class UpdateSoldeDto extends PartialType(CreateSoldeDto) {}
