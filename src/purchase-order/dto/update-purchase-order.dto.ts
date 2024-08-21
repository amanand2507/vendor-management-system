import { ApiProperty } from '@nestjs/swagger';

export class UpdatePurchaseOrderDto {
  @ApiProperty()
  poNumber: string;

  @ApiProperty()
  orderDate: Date;

  @ApiProperty()
  deliveryDate: Date;

  @ApiProperty()
  items: string[];

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  status: string;
}