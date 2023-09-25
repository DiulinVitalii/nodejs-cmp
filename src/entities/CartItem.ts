import { Check, Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Cart } from './Cart.ts';
import { Product } from './Product.ts';

@Entity()
export class CartItem {
  @PrimaryKey({ autoincrement: true, hidden: true })
  id!: number;

  @ManyToOne(() => Cart, { ref: true, fieldName: 'cart_id', hidden: true })
  cartId!: Ref<Cart>;

  @ManyToOne(() => Product, { fieldName: 'product' })
  product!: Product;

  @Property()
  @Check({ expression: 'count > 0' })
  count!: number;

}
