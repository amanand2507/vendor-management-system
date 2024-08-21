import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrder } from './purchase-order.model';

@Injectable()
export class PurchaseOrdersService {
  constructor(@InjectModel(PurchaseOrder.name) private readonly purchaseOrderModel: Model<PurchaseOrder>) {}

  async createPurchaseOrder(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const purchaseOrder = new this.purchaseOrderModel(createPurchaseOrderDto);
    return purchaseOrder.save();
  }

  async getAllPurchaseOrders() {
    return this.purchaseOrderModel.find().exec();
  }

  async getPurchaseOrder(poId: string) {
    return this.purchaseOrderModel.findById(poId).exec();
  }

  async updatePurchaseOrder(poId: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrderModel.findByIdAndUpdate(poId, updatePurchaseOrderDto, { new: true }).exec();
  }

  async deletePurchaseOrder(poId: string) {
    return this.purchaseOrderModel.findByIdAndDelete(poId).exec();
  }
}