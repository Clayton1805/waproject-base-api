export interface ISale {
  id?: number;
  userId: number;
  status: string;

  createdDate?: Date;
  updatedDate?: Date;
}

export enum StatusSale {
  pending = 'pending',
  delivered = 'delivered'
}
