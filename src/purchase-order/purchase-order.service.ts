import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorsService } from 'src/vendor/vendor.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrder } from './purchase-order.model';

@Injectable()
export class PurchaseOrdersService {
  constructor(@InjectModel(PurchaseOrder.name) private readonly purchaseOrderModel: Model<PurchaseOrder>,
     private readonly vendorService: VendorsService,
  ) { }

  async createPurchaseOrder(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const leadTimeInDays = 5;
    const purchaseOrder = new this.purchaseOrderModel(createPurchaseOrderDto);

    const expectedDeliveryDate = new Date(purchaseOrder.orderDate.getTime() + leadTimeInDays * 24 * 60 * 60 * 1000);

    purchaseOrder.quantity = purchaseOrder.items.reduce((acc, item) => acc + item.quantity, 0);

    purchaseOrder.deliveryDate = expectedDeliveryDate;


    this.vendorService.updateVendorPerformance(createPurchaseOrderDto.vendor)
    return purchaseOrder.save();
  }

  async getAllPurchaseOrders() {
    return this.purchaseOrderModel.find().exec();
  }

  async getPurchaseOrder(poId: string) {
    return this.purchaseOrderModel.findById(poId).exec();
  }

  async updatePurchaseOrder(poId: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrderModel.findByIdAndUpdate(poId, updatePurchaseOrderDto, { new: true }).exec().then((doc)=>{
      this.vendorService.getVendorPerformance(doc.vendor);
    });
  }

  async acknowledgePO(poId: string, acknowledgmentDate: Date) {
    try {
      const po = await this.purchaseOrderModel.findById(poId);
      if (!po) {
        console.log("po not found");
        throw new Error('Purchase Order not found');
      }
      po.acknowledgmentDate = acknowledgmentDate;
      await po.save();
     
    } catch (error) {
      console.log(error)
      return error;
    }
  }
}
  
  
  