import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHistoricalPerformanceDto } from 'src/historical/historical.dto';
import { HistoricalPerformanceService } from 'src/historical/historical.service';
import { Vendor } from '../vendor/vendor.model';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrder } from './purchase-order.model';

@Injectable()
export class PurchaseOrdersService {
  constructor(@InjectModel(PurchaseOrder.name) private readonly purchaseOrderModel: Model<PurchaseOrder>,
    @InjectModel(Vendor.name) private readonly vendorModel: Model<Vendor>,
    private readonly historicalService: HistoricalPerformanceService
  ) { }

  async createPurchaseOrder(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const leadTimeInDays = 5;
    const purchaseOrder = new this.purchaseOrderModel(createPurchaseOrderDto);

    const expectedDeliveryDate = new Date(purchaseOrder.orderDate.getTime() + leadTimeInDays * 24 * 60 * 60 * 1000);

    purchaseOrder.deliveryDate = expectedDeliveryDate;

    this.updateVendorPerformance(purchaseOrder.vendor,purchaseOrder);


    return purchaseOrder.save();
  }

  async getAllPurchaseOrders() {
    return this.purchaseOrderModel.find().exec();
  }

  async getPurchaseOrder(poId: string) {
    return this.purchaseOrderModel.findById(poId).exec();
  }

  async updatePurchaseOrder(poId: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    this.updateVendorPerformance(poId,this.purchaseOrderModel,updatePurchaseOrderDto)
    return this.purchaseOrderModel.findByIdAndUpdate(poId, updatePurchaseOrderDto, { new: true }).exec();
  }

  async acknowledgePO(poId: string, acknowledgmentDate: Date) {
    try {
      const po = await this.purchaseOrderModel.findById(poId);
      if (!po) {
        throw new Error('Purchase Order not found');
      }
      po.acknowledgmentDate = acknowledgmentDate;
      await po.save();
      await this.updateAverageResponseTime(po.vendor);
      return 'Purchase Order acknowledged successfully';
    } catch (error) {
      return error;
    }
  }

  async updateAverageResponseTime(vendorId: string) {
    const acknowledgedPOs = await this.purchaseOrderModel.find({ vendor: vendorId, acknowledgmentDate: { $ne: null } });
    const responseTimes = acknowledgedPOs.map(po => po.acknowledgmentDate.getTime() - po.issueDate.getTime());
    const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const vendor = await this.vendorModel.findById(vendorId);
    vendor.averageResponseTime = averageResponseTime;
    await vendor.save();
  }

  async  updateVendorPerformance(vendorId :string, purchaseOrder, updatedData = {}) {
    const vendor = await this.vendorModel.findById(vendorId);
    if (!vendor) {
      return;
    }
  
    const { status, qualityRating, deliveryDate } = updatedData || purchaseOrder;
    const isCompleted = status === 'completed';
    const isOnTime = deliveryDate ? deliveryDate >= purchaseOrder.orderDate : true;
  
    vendor.onTimeDeliveryRate = calculateOnTimeDeliveryRate(vendor.onTimeDeliveryRate, isCompleted, isOnTime);
    vendor.qualityRatingAvg = calculateQualityRatingAvg(vendor.qualityRatingAvg, qualityRating, isCompleted);
    vendor.averageResponseTime = calculateAverageResponseTime(vendor.averageResponseTime, purchaseOrder.acknowledgmentDate, purchaseOrder.issueDate);
    vendor.fulfillmentRate = calculateFulfillmentRate(vendor.fulfillmentRate, isCompleted, status);
  
    await vendor.save();

    const historicalPerformance = new CreateHistoricalPerformanceDto();
    historicalPerformance.vendor = vendorId;
    historicalPerformance.date = new Date();
    historicalPerformance.onTimeDeliveryRate = vendor.onTimeDeliveryRate;
    historicalPerformance.qualityRatingAvg = vendor.qualityRatingAvg;
    historicalPerformance.averageResponseTime = vendor.averageResponseTime;
    historicalPerformance.fulfillmentRate = vendor.fulfillmentRate;

    await this.historicalService.createHistoricalPerformance(historicalPerformance);
  }


}

  // Helper functions for metric calculations
  function calculateOnTimeDeliveryRate(currentRate:number, isCompleted:boolean, isOnTime:boolean) {
    if (isCompleted && isOnTime) {
      return (currentRate * 99 + 100) / 100; // Increment the rate by 1%
    } else if (isCompleted && !isOnTime) {
      return (currentRate * 99) / 100; // Decrement the rate by 1%
    }
    return currentRate;
  }
  
  function calculateQualityRatingAvg(currentAvg:number, qualityRating: number, isCompleted:boolean) {
    if (isCompleted && qualityRating) {
      return (currentAvg * 99 + qualityRating) / 100; // Update the average based on the new rating
    }
    return currentAvg;
  }
  
  function calculateAverageResponseTime(currentAvg:number, acknowledgmentDate:Date, issueDate:Date) {
    if (acknowledgmentDate && issueDate) {
      const responseTime = (acknowledgmentDate.getTime() - issueDate.getTime()) / 1000; // Calculate response time in seconds
      return (currentAvg * 99 + responseTime) / 100; // Update the average response time
    }
    return currentAvg;
  }
  
  function calculateFulfillmentRate(currentRate:number, isCompleted:boolean, status:string) {
    if (isCompleted && status === 'completed') {
      return (currentRate * 99 + 100) / 100; // Increment the rate by 1%
    } else if (isCompleted && status !== 'completed') {
      return (currentRate * 99) / 100; // Decrement the rate by 1%
    }
    return currentRate;
  }
  
  
  