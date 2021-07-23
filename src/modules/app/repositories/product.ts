import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IProduct } from 'modules/database/interfaces/product';
import { Product } from 'modules/database/models/product';
import { Page, Transaction } from 'objection';

@Injectable()
export class ProductRepository {
  public async insert(model: IProduct, transaction?: Transaction): Promise<Product> {
    return Product.query(transaction).insert(model);
  }

  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Product>> {
    return Product.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);
  }

  public async findById(id: number, transaction?: Transaction): Promise<Product> {
    return Product.query(transaction)
      .where({ id })
      .first();
  }
}
