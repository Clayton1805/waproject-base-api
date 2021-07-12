import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { SaleProduct } from './saleProduct';

import { User } from './user';

export class Sale extends Model {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'integer' })
  public userId: number;
  @ApiProperty({ type: 'string' })
  public status: string;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Sale';
  }

  public static get relationMappings(): any {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'User.id',
          to: 'Sale.userId'
        }
      },
      saleProducts: {
        relation: Model.HasManyRelation,
        modelClass: SaleProduct,
        join: {
          from: 'Sale.id',
          to: 'SaleProduct.saleId'
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
