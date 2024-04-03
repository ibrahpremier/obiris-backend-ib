import { PartialType } from '@nestjs/mapped-types';
import { CreateParisDto } from './create-paris.dto';

export class UpdateParisDto extends PartialType(CreateParisDto) {}
