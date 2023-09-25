import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { User } from './User.ts';
import { CartItem } from './CartItem.ts';

@Entity()
export class Cart {
  @PrimaryKey({ autoincrement: true, fieldName: 'id' })
  id!: number;

  @OneToOne({ ref: true, fieldName: 'user_id' })
  userId!: Ref<User>;

  @Property({ hidden: true })
  isDeleted: boolean = false;

  @OneToMany(() => CartItem, item => item.cartId, { orphanRemoval: true })
  items = new Collection<CartItem>(this);

  @Property({ persist: false })
  get totalPrice() {
    return this?.items?.getItems().reduce((res, item) => {
      res += item.product.price * item.count;
      return res;
    }, 0) || 0;
  }
}
