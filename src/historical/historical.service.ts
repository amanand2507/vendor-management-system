import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { HistoricalPerformance } from './historical.model';
import { CreateHistoricalPerformanceDto } from './historical.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HistoricalPerformanceService {
  constructor(@InjectModel(HistoricalPerformance.name) private readonly historicalPerformanceModel: Model<HistoricalPerformance>) {}

  async createHistoricalPerformance(createHistoricalPerformanceDto: CreateHistoricalPerformanceDto) {
    const historicalPerformance = new this.historicalPerformanceModel(createHistoricalPerformanceDto);
    return await historicalPerformance.save();
  }
}