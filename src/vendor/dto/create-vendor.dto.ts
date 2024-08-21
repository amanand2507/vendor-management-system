import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  contactDetails: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  vendorCode: string;
}