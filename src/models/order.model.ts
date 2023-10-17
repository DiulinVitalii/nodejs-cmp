export enum ORDER_STATUS {
  CREATED = 'created',
  COMPLETED = 'completed',
}

export interface OrderModel {
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
}
