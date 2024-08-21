import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty({ default: 'Aman Anand' })
  name: string;

  @ApiProperty({ default: 'amanand257@gmail.com' })
  contactDetails: string;

  @ApiProperty({ default: 'NIT Kurukshetra' })
  address: string ;

  @ApiProperty({ default: 'VENDOR-001' })
  vendorCode: string;
}