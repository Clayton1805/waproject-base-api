import { Injectable } from '@nestjs/common';
import { ISaleProduct } from 'modules/database/interfaces/saleProduct';
import { SaleProduct } from 'modules/database/models/saleProduct';
import { Transaction } from 'objection';

@Injectable()
export class SaleProductRepository {
  public async insert(model: ISaleProduct, transaction?: Transaction): Promise<SaleProduct> {
    return SaleProduct.query(transaction).insert(model);
  }

  public async listBySaleId(saleId: number, transaction?: Transaction): Promise<SaleProduct[]> {
    return SaleProduct.query(transaction)
      .select('*')
      .where({ saleId });
  }
}
