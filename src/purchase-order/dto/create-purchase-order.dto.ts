import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseOrderDto {
  @ApiProperty({ default: '' })
  poNumber: string = '';

  @ApiProperty({ default: '' })
  vendor: string = '';

  @ApiProperty({ type: () => [ItemDto], default: [{
    name : "laptop"  , quantity: 1
  }] })
  items: ItemDto[] = [];

  @ApiProperty({ default: 'pending' })
  status: string = 'pending';
}

export class ItemDto {
  @ApiProperty({ default: '' })
  name: string = '';

  @ApiProperty({ default: 0 })
  quantity: number = 0;
}