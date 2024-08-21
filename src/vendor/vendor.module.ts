import { Module } from '@nestjs/common';
import { VendorsController } from './vendor.controller';
import { VendorsService } from './vendor.service';
import { Vendor, VendorSchema } from './vendor.model';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoricalPerformance, HistoricalPerformanceSchema } from 'src/historical/historical.model';
import { PurchaseOrder, PurchaseOrderSchema } from 'src/purchase-order/purchase-order.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
    MongooseModule.forFeature([{ name: HistoricalPerformance.name, schema: HistoricalPerformanceSchema }]),
    MongooseModule.forFeature([{ name: PurchaseOrder.name, schema: PurchaseOrderSchema }]),
  ],
  controllers: [VendorsController],
  providers: [VendorsService],
})
export class VendorsModule {}