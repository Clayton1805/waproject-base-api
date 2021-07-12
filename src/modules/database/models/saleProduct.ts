import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { Product } from './product';

import { Sale } from './sale';

export class SaleProduct extends Model {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public saleId: number;
  @ApiProperty({ type: 'integer' })
  public productId: number;
  @ApiProperty({ type: 'integer' })
  public quantity: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'SaleProduct';
  }

  public static get relationMappings(): any {
    return {
      sale: {
        relation: Model.HasOneRelation,
        modelClass: Sale,
        join: {
          from: 'Sale.id',
          to: 'SaleProduct.saleId'
        }
      },
      product: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: 'Product.id',
          to: 'Product.productId'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}
