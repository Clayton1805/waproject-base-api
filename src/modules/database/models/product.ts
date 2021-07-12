import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { SaleProduct } from './saleProduct';

export class Product extends Model {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public name: string;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'number' })
  public price: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Product';
  }

  public static get relationMappings(): any {
    return {
      saleProducts: {
        relation: Model.HasManyRelation,
        modelClass: SaleProduct,
        join: {
          from: 'Product.id',
          to: 'SaleProduct.productId'
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
