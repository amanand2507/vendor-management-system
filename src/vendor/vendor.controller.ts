import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { VendorsService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vender.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('vendors')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vendor' })
  @ApiResponse({ status: 201, description: 'Vendor created successfully' })
  createVendor(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.createVendor(createVendorDto);
  }

  @Get()
  getAllVendors() {
    return this.vendorsService.getAllVendors();
  }

  @Get(':vendorId')
  getVendor(@Param('vendorId') vendorId: string) {
    return this.vendorsService.getVendor(vendorId);
  }

  @Put(':vendorId')
  updateVendor(@Param('vendorId') vendorId: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorsService.updateVendor(vendorId, updateVendorDto);
  }

  @Delete(':vendorId')
  deleteVendor(@Param('vendorId') vendorId: string) {
    return this.vendorsService.deleteVendor(vendorId);
  }

  @Get(':vendorId/performance')
  getVendorPerformance(@Param('vendorId') vendorId: string) {
    return this.vendorsService.getVendorPerformance(vendorId);
  }
}