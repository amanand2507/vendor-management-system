import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseOrder } from 'src/purchase-order/purchase-order.model';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vender.dto';
import { Vendor } from './vendor.model';


@Injectable()
export class VendorsService {
  constructor(@InjectModel(Vendor.name) private readonly vendorModel: Model<Vendor>,) {}

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

  
}