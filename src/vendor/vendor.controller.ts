import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { VendorsService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vender.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('vendors')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  /**
   * Create a new vendor
   * @param createVendorDto - Vendor details
   * @returns Created vendor
   */
  @Post()
  @ApiOperation({ summary: 'Create a new vendor' })
  @ApiResponse({ status: 201, description: 'Vendor created successfully' })
  createVendor(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.createVendor(createVendorDto);
  }

  /**
   * Get all vendors
   * @returns Array of vendors
   */
  @Get()
  @ApiOperation({ summary: 'Get all vendors' })
  @ApiResponse({ status: 200, description: 'Vendors retrieved successfully' })
  getAllVendors() {
    return this.vendorsService.getAllVendors();
  }

  /**
   * Get a vendor by ID
   * @param vendorId - Vendor ID
   * @returns Vendor details
   */
  @Get(':vendorId')
  @ApiOperation({ summary: 'Get a vendor by ID' })
  @ApiResponse({ status: 200, description: 'Vendor retrieved successfully' })
  getVendor(@Param('vendorId') vendorId: string) {
    return this.vendorsService.getVendor(vendorId);
  }

  /**
   * Update a vendor
   * @param vendorId - Vendor ID
   * @param updateVendorDto - Updated vendor details
   * @returns Updated vendor
   */
  @Put(':vendorId')
  @ApiOperation({ summary: 'Update a vendor' })
  @ApiResponse({ status: 200, description: 'Vendor updated successfully' })
  updateVendor(@Param('vendorId') vendorId: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorsService.updateVendor(vendorId, updateVendorDto);
  }

  /**
   * Delete a vendor
   * @param vendorId - Vendor ID
   * @returns Deleted vendor
   */
  @Delete(':vendorId')
  @ApiOperation({ summary: 'Delete a vendor' })
  @ApiResponse({ status: 200, description: 'Vendor deleted successfully' })
  deleteVendor(@Param('vendorId') vendorId: string) {
    return this.vendorsService.deleteVendor(vendorId);
  }

  /**
   * Get a vendor's performance
   * @param vendorId - Vendor ID
   * @returns Vendor performance data
   */
  @Get(':vendorId/performance')
  @ApiOperation({ summary: 'Get a vendor\'s performance' })
  @ApiResponse({ status: 200, description: 'Vendor performance data retrieved successfully' })
  getVendorPerformance(@Param('vendorId') vendorId: string) {
    return this.vendorsService.getVendorPerformance(vendorId);
  }
}