import { Injectable } from '@nestjs/common';
import { StatusSale } from 'modules/database/interfaces/sale';
import { IListSaleProduct } from 'modules/database/interfaces/saleProduct';

import { SaleRepository } from '../repositories/sale';
import { SaleProductRepository } from '../repositories/saleProduct';

@Injectable()
export class SaleService {
  constructor(private saleRepository: SaleRepository, private saleProductRepository: SaleProductRepository) {}

  public async create(userId: number, listProducts: IListSaleProduct[]) {
    const { id } = await this.saleRepository.insert({
      userId,
      status: StatusSale.pending
    });
    try {
      for (let index = 0; index < listProducts.length; index++) {
        const product = listProducts[index];

        await this.saleProductRepository.insert({
          ...product,
          saleId: id
        });
      }
    } catch (err) {
      await this.saleRepository.deleteById(id);
      throw new Error(err);
    }
  }
}
