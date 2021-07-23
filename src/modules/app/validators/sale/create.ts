import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateValidator {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public productId: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public quantity: number;
}
