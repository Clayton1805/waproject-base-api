import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { Product } from 'modules/database/models/product';
import { Page, Transaction } from 'objection';

@Injectable()
export class ProductRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Product>> {
    let query = Product.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    return query;
  }

  public async findById(id: number, transaction?: Transaction): Promise<Product> {
    return Product.query(transaction)
      .where({ id })
      .first();
  }
}
