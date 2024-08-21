import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class HistoricalPerformance {
  @Prop({ required: true, ref: 'Vendor' })
  vendor: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  onTimeDeliveryRate: number;

  @Prop({ required: true })
  qualityRatingAvg: number;

  @Prop({ required: true })
  averageResponseTime: number;

  @Prop({ required: true })
  fulfillmentRate: number;
}

export const HistoricalPerformanceSchema = SchemaFactory.createForClass(HistoricalPerformance);