import { PartialType } from '@nestjs/mapped-types';
import { CreateParrainageDto } from './create-parrainage.dto';

export class UpdateParrainageDto extends PartialType(CreateParrainageDto) {}
