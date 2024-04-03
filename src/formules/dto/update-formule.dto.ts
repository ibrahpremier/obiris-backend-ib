import { PartialType } from '@nestjs/mapped-types';
import { CreateFormuleDto } from './create-formule.dto';

export class UpdateFormuleDto extends PartialType(CreateFormuleDto) {}
