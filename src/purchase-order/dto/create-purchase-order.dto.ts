import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseOrderDto {
  @ApiProperty()
  poNumber: string;

  @ApiProperty()
  vendor: string;

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