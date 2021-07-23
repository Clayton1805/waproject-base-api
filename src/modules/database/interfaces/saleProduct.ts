export interface ISaleProduct {
  id?: number;
  saleId: number;
  productId: number;
  quantity: number;

  createdDate?: Date;
  updatedDate?: Date;
}

export interface IListSaleProduct {
  productId: number;
  quantity: number;
}
