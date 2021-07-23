import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
// import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { TokenGuard } from 'modules/common/guards/token';
// import { Product } from 'modules/database/models/product';

// import { IListSaleProduct } from 'modules/database/interfaces/saleProduct';
import { SaleService } from '../services/sale';
import { CreateValidator } from '../validators/sale/create';

@Controller('/sale')
@UseGuards(TokenGuard)
export class SaleController {
  constructor(private saleService: SaleService) {}
  @Post()
  @ApiResponse({ status: 201 })
  public async create(@Body() model: [CreateValidator], @Req() request: Request) {
    await this.saleService.create((request as any).user.id, model);
    return;
  }

  // @Get()
  // @ApiResponse({ status: 200, type: [Product] })
  // public async list(@Query() model: IPaginationParams) {
  //   return this.productRepository.list(model);
  // }

  // @Get(':productId')
  // @ApiResponse({ status: 200, type: Product })
  // public async details(@Param('productId', ParseIntPipe) productId: number) {
  //   return this.productRepository.findById(productId);
  // }
}
