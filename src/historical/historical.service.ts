import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { HistoricalPerformance } from './historical.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HistoricalPerformanceService {
  constructor(@InjectModel(HistoricalPerformance.name) private readonly historicalPerformanceModel: Model<HistoricalPerformance>) {}

  
}