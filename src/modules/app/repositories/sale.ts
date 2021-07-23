import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { ISale } from 'modules/database/interfaces/sale';
import { Sale } from 'modules/database/models/sale';
import { Page, Transaction } from 'objection';

@Injectable()
export class SaleRepository {
  public async insert(model: ISale, transaction?: Transaction): Promise<Sale> {
    return Sale.query(transaction).insert(model);
  }

  public async list(userId: number, params: IPaginationParams, transaction?: Transaction): Promise<Page<Sale>> {
    return Sale.query(transaction)
      .select('*')
      .where({ userId })
      .page(params.page, params.pageSize);
  }

  public async findById(id: number, transaction?: Transaction): Promise<Sale> {
    return Sale.query(transaction)
      .where({ id })
      .first();
  }

  public async deleteById(id: number, transaction?: Transaction) {
    await Sale.query(transaction)
      .delete()
      .where({ id });
  }
}
