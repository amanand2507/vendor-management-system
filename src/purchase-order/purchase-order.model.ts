import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';



@Schema()
export class PurchaseOrder {
  @Prop({ required: true, unique: true })
  poNumber: string;

  @Prop({ required: true, ref: 'Vendor' })
  vendor: string;

  @Prop({ type: Date, default: Date.now() })
  orderDate: Date;

  @Prop({ required: true })
  deliveryDate: Date;

  @Prop({ required: true})
  items: string[];

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Number, default: 0 })
  qualityRating: number;

  @Prop({ type: Date })
  issueDate: Date;

  @Prop({ type: Date, default: null })
  acknowledgmentDate: Date;

  @Prop({ type: Number, default: 0 })
  responseTime: number;
}

export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);