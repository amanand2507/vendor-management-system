// purchase-orders.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { acknowledgeDto } from './dto/acknowledge.dto';

@ApiTags('purchase-orders')
@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post()
  createPurchaseOrder(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrdersService.createPurchaseOrder(createPurchaseOrderDto);
  }

  @Get()
  getAllPurchaseOrders() {
    return this.purchaseOrdersService.getAllPurchaseOrders();
  }

  @Get(':poId')
  getPurchaseOrder(@Param('poId') poId: string) {
    return this.purchaseOrdersService.getPurchaseOrder(poId);
  }

  @Put(':poId')
  updatePurchaseOrder(@Param('poId') poId: string, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrdersService.updatePurchaseOrder(poId, updatePurchaseOrderDto);
  }

  @Post(':poId/acknowledge')
  async acknowledgePO(@Param('poId') poId: string, @Body() acknowledgeDto: acknowledgeDto) {

    return this.purchaseOrdersService.acknowledgePO(poId,acknowledgeDto.ackDate);
    
  }

  
}