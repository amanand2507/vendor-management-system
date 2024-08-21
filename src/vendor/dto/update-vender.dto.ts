import { ApiProperty } from '@nestjs/swagger';

export class UpdateVendorDto {
  @ApiProperty({ default: 'Aman Anand' })
  name: string;

  @ApiProperty({ default: 'amanand257@gmail.com' })
  contactDetails: string;

  @ApiProperty({ default: 'NIT Kurukshetra' })
  address: string ;

}