import { ApiProperty } from '@nestjs/swagger';

export class UpdatePurchaseOrderDto {

  @ApiProperty()
  qualityRating: number;

  @ApiProperty({default:'completed'})
  status: string;
}