import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { TokenGuard } from 'modules/common/guards/token';
import { Product } from 'modules/database/models/product';

import { ProductRepository } from '../repositories/product';

@Controller('/product')
@UseGuards(TokenGuard)
export class ProductController {
  constructor(private productRepository: ProductRepository) {}
  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async list(@Query() model: IPaginationParams) {
    return this.productRepository.list(model);
  }

  @Get(':productId')
  @ApiResponse({ status: 200, type: Product })
  public async details(@Param('productId', ParseIntPipe) productId: number) {
    return this.productRepository.findById(productId);
  }
}
