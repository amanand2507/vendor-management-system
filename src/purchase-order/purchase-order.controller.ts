// purchase-orders.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { acknowledgeDto } from './dto/acknowledge.dto';

@ApiTags('purchase-orders')
@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  /**
   * Create a new purchase order
   * @param createPurchaseOrderDto - Purchase order details
   * @returns Created purchase order
   */
  @Post()
  @ApiOperation({ summary: 'Create a new purchase order' })
  @ApiResponse({ status: 201, description: 'Purchase order created successfully' })
  createPurchaseOrder(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrdersService.createPurchaseOrder(createPurchaseOrderDto);
  }

  /**
   * Get all purchase orders
   * @returns Array of purchase orders
   */
  @Get()
  @ApiOperation({ summary: 'Get all purchase orders' })
  @ApiResponse({ status: 200, description: 'Purchase orders retrieved successfully' })
  getAllPurchaseOrders() {
    return this.purchaseOrdersService.getAllPurchaseOrders();
  }

  /**
   * Get a purchase order by ID
   * @param poId - Purchase order ID
   * @returns Purchase order details
   */
  @Get(':poId')
  @ApiOperation({ summary: 'Get a purchase order by ID' })
  @ApiResponse({ status: 200, description: 'Purchase order retrieved successfully' })
  getPurchaseOrder(@Param('poId') poId: string) {
    return this.purchaseOrdersService.getPurchaseOrder(poId);
  }

  /**
   * Update a purchase order
   * @param poId - Purchase order ID
   * @param updatePurchaseOrderDto - Updated purchase order details
   * @returns Updated purchase order
   */
  @Put(':poId')
  @ApiOperation({ summary: 'Update a purchase order' })
  @ApiResponse({ status: 200, description: 'Purchase order updated successfully' })
  updatePurchaseOrder(@Param('poId') poId: string, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrdersService.updatePurchaseOrder(poId, updatePurchaseOrderDto);
  }

  /**
   * Acknowledge a purchase order
   * @param poId - Purchase order ID
   * @param acknowledgeDto - Acknowledgment details
   * @returns Acknowledged purchase order
   */
  @Post(':poId/acknowledge')
  @ApiOperation({ summary: 'Acknowledge a purchase order' })
  @ApiResponse({ status: 200, description: 'Purchase order acknowledged successfully' })
  @ApiBody({ type: acknowledgeDto })
  async acknowledgePO(@Param('poId') poId: string, @Body() acknowledgeDto: acknowledgeDto) {
    return this.purchaseOrdersService.acknowledgePO(poId, acknowledgeDto.ackDate);
  }
}