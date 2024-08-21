import { ApiProperty } from '@nestjs/swagger';

export class UpdateVendorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  contactDetails: string;

  @ApiProperty()
  address: string;
}