import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../entities/Product.ts';
import { User } from '../entities/User.ts';
import { Cart } from '../entities/Cart.ts';
import { CartItem } from '../entities/CartItem.ts';
import { Delivery } from '../entities/Delivery.ts';
import { Payment } from '../entities/Payment.ts';
import { Order, ORDER_STATUS } from '../entities/Order.ts';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const user1: User = em.create(User, {});
    const card1: Cart = em.create(Cart, {
      userId: user1,
      isDeleted: false
    } as Cart);
    const user2: User = em.create(User, {});
    const user3: User = em.create(User, {});
    const card2: Cart = em.create(Cart, {
      userId: user2,
      isDeleted: false
    } as Cart);
    const items1: CartItem[] = [];
    const items2: CartItem[] = [];
    for (let i = 0; i <= 5; i++) {
      const product: Product = em.create(Product, {
        title: `Iphone 1${i}`,
        description: `Awesome phone Iphone 1${i}`,
        price: 1000 + i * 100
      });
      const item1: CartItem = em.create(CartItem, {
        product: product,
        cartId: card1.id,
        count: i + 1
      });

      const item2: CartItem = em.create(CartItem, {
        product: product,
        cartId: card2.id,
        count: i + 1
      });

      items1.push(item1);
      items2.push(item2);
    }

    card1.items.add(items1);
    card2.items.add(items2);
    const delivery: Delivery = em.create(Delivery, {
      type: 'Nova Poshta',
      address: 'Myhosransk 1'
    });
    const payment: Payment = em.create(Payment, {
      type: 'Credit Cart',
      address: 'Myhosransk 1',
      creditCard: '123123123123'
    });
    const order: Order = em.create(Order, {
      cartId: card1,
      payment: payment,
      delivery: delivery,
      comments: 'Some comments',
      status: ORDER_STATUS.CREATED
    });
  }
}
