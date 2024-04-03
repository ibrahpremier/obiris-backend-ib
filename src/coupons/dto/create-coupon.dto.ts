import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

}
