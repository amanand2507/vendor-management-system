// vendors.module.ts
import { Module } from '@nestjs/common';
import { VendorsController } from './vendor.controller';
import { VendorsService } from './vendor.service';
import { VendorSchema } from './vendor.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]),
  ],
  controllers: [VendorsController],
  providers: [VendorsService],
})
export class VendorsModule {}