import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoricalPerformance } from 'src/historical/historical.model';
import { PurchaseOrder } from 'src/purchase-order/purchase-order.model';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vender.dto';
import { Vendor } from './vendor.model';


@Injectable()
export class VendorsService {
  constructor(@InjectModel(Vendor.name) private readonly vendorModel: Model<Vendor>
  ,@InjectModel(PurchaseOrder.name) private readonly purchaseModel: Model<PurchaseOrder>,
  @InjectModel(HistoricalPerformance.name) private readonly historicalModel: Model<HistoricalPerformance>) {}

  async createVendor(createVendorDto: CreateVendorDto) {
    const vendor = new this.vendorModel(createVendorDto);
    return vendor.save();
  }

  async getAllVendors() {
    return this.vendorModel.find().exec();
  }

  async getVendor(vendorId: string) {
    return this.vendorModel.findById(vendorId).exec();
  }

  async updateVendor(vendorId: string, updateVendorDto: UpdateVendorDto) {
    return this.vendorModel.findByIdAndUpdate(vendorId, updateVendorDto, { new: true }).exec();
  }

  async deleteVendor(vendorId: string) {
    return this.vendorModel.findByIdAndDelete(vendorId).exec();
  }

  async getVendorPerformance(vendorId) {

    const onTimeDeliveryRate = await this.calculateOnTimeDeliveryRate(
      vendorId
    );
    const qualityRatingAvg =await  this.calculateQualityRatingAvg(
      vendorId
    );
    const averageResponseTime = await this.calculateAverageResponseTime(
      vendorId
    );
    const fulfillmentRate = await  this.calculateFulfillmentRate(
      vendorId
    );

    return {
      onTimeDeliveryRate,
      qualityRatingAvg,
      averageResponseTime,
      fulfillmentRate,
    };
  }


  async calculateOnTimeDeliveryRate(vendorId: string): Promise<number> {
    const completedPurchaseOrders = await this.purchaseModel.find({
        vendor: vendorId ,
        status: 'completed',
    });

    const onTimeDeliveries = completedPurchaseOrders.filter(
      (po) => po.deliveryDate <= po.orderDate
    );

    return onTimeDeliveries.length / completedPurchaseOrders.length;
  }

  async calculateQualityRatingAvg(vendorId: string): Promise<number> {
    const completedPurchaseOrders = await this.purchaseModel.find({
        vendor:  vendorId ,
        status: 'completed',
        qualityRating: { $ne: null }
    });

    const totalQualityRating = completedPurchaseOrders.reduce(
      (sum, po) => sum + po.qualityRating,
      0
    );

    return totalQualityRating / completedPurchaseOrders.length;
  }

  async calculateAverageResponseTime(vendorId: string): Promise<number> {
    const acknowledgedPurchaseOrders = await this.purchaseModel.find({
      vendor: vendorId,
      acknowledgmentDate: { $ne: null },
    });
  
    const totalResponseTime = acknowledgedPurchaseOrders.reduce((acc, po) => {
      const acknowledgmentDate = new Date(po.acknowledgmentDate);
      const orderDate = new Date(po.orderDate);
      const responseTime = acknowledgmentDate.getTime() - orderDate.getTime();
      const responseTimeInDays = Math.round(responseTime / (1000 * 3600 * 24));
      return acc + responseTimeInDays;
    }, 0);
  
    return totalResponseTime / acknowledgedPurchaseOrders.length;
  }

  async calculateFulfillmentRate(vendorId: string): Promise<number> {
    const completedPurchaseOrders = await this.purchaseModel.find({
        vendor: vendorId,
        status: 'completed',
    });

    const fulfilledPurchaseOrders = completedPurchaseOrders.filter(
      (po) => po.qualityRating !== null
    );

    return fulfilledPurchaseOrders.length / completedPurchaseOrders.length;
  }

  async updateVendorPerformance(vendorId: string): Promise<void> {
    const onTimeDeliveryRate = await this.calculateOnTimeDeliveryRate(vendorId);
    const qualityRatingAvg = await this.calculateQualityRatingAvg(vendorId);
    const averageResponseTime = await this.calculateAverageResponseTime(vendorId);
    const fulfillmentRate = await this.calculateFulfillmentRate(vendorId);

    await this.historicalModel.findOneAndUpdate({vendorId}, {
      onTimeDeliveryRate,
      qualityRatingAvg,
      averageResponseTime,
      fulfillmentRate,
    });

    // Optionally, save historical performance data
    await this.historicalModel.create({
      vendor:  vendorId ,
      date: new Date(),
      onTimeDeliveryRate,
      qualityRatingAvg,
      averageResponseTime,
      fulfillmentRate,
    });
  }

  
}