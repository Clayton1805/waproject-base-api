import { Controller, Get, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { TokenGuard } from 'modules/common/guards/token';
import { Product } from 'modules/database/models/product';

import { ProductRepository } from '../repositories/product';

@Controller('/product')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}
  @UseGuards(TokenGuard)
  @Get()
  @ApiResponse({ status: 200, type: [Product] })
  public async list(@Query() model: IPaginationParams, @Req() request: Request) {
    console.log('request', (request as any).user);
    return this.productRepository.list(model);
  }

  @Get(':productId')
  @ApiResponse({ status: 200, type: Product })
  public async details(@Param('productId', ParseIntPipe) productId: number) {
    return this.productRepository.findById(productId);
  }
}
