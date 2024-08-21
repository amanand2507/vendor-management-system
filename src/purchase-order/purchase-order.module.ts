import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseOrdersController } from './purchase-order.controller';
import { PurchaseOrdersService } from './purchase-order.service';
import { PurchaseOrder, PurchaseOrderSchema } from './purchase-order.model';
import { Vendor, VendorSchema } from 'src/vendor/vendor.model';
import { HistoricalPerformance, HistoricalPerformanceSchema } from 'src/historical/historical.model';
import { VendorsService } from 'src/vendor/vendor.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PurchaseOrder.name, schema: PurchaseOrderSchema }]),
    MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
    MongooseModule.forFeature([{ name: HistoricalPerformance.name, schema: HistoricalPerformanceSchema }]),
  ],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService,VendorsService],
  exports: [PurchaseOrdersService],
})
export class PurchaseOrderModule {}