import { ApiProperty } from '@nestjs/swagger';

export class acknowledgeDto {
  @ApiProperty()
  ackDate: Date;
}