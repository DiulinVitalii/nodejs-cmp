import { Entity, Enum, ManyToOne, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Cart } from './Cart.ts';
import { Payment } from './Payment.ts';
import { Delivery } from './Delivery.ts';

@Entity()
export class Order {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Cart, { ref: true, fieldName: 'cart_id' })
  cartId!: Ref<Cart>;

  @OneToOne({ ref: true, fieldName: 'payment' })
  payment!: Ref<Payment>;

  // @OneToOne({ fieldName: 'delivery' })
  // delivery!: Delivery;

  // @OneToOne({ ref: true, fieldName: 'payment' })
  // payment!: Ref<Payment>;
  //
  @OneToOne({ ref: true, fieldName: 'delivery' })
  delivery!: Ref<Delivery>;

  @Property()
  comments!: string;

  @Enum(() => ORDER_STATUS)
  status!: ORDER_STATUS;
}

export enum ORDER_STATUS {
  CREATED = 'created',
  COMPLETED = 'completed',
}
