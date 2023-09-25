import { DI } from '../index.ts';
import { Cart } from '../entities/Cart.ts';
import { Reference } from '@mikro-orm/core';
import { User } from '../entities/User.ts';
import { CustomError } from '../utils/custom-error.ts';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NO_CART } from '../utils/constants.ts';
import { Product } from '../entities/Product.ts';
import { CartItem } from '../entities/CartItem.ts';
import { Delivery } from '../entities/Delivery.ts';
import { Payment } from '../entities/Payment.ts';
import { Order, ORDER_STATUS } from '../entities/Order.ts';
import { OrderModel } from '../models/order.model.ts';

export class CartRepository {
  static async createUserCard(userId: number): Promise<Cart> {
    const cart = await DI.cartRepository.findOne(
      { userId },
      { populate: ['items'] }
    );

    if (!cart || cart?.isDeleted) {
      const newCart: Cart = await DI.cartRepository.upsert({
        userId: Reference.createFromPK(User, userId),
        isDeleted: false
      });
      if (cart) {
        cart.items.removeAll();
        await DI.em.persistAndFlush(cart);
      }

      return cart || newCart;
    }

    throw new CustomError(`Card for user id ${userId} already exist`, StatusCodes.CONFLICT);
  }

  static async getUserCard(userId: number): Promise<Cart> {
    const cart = await DI.cartRepository.findOne(
      { userId },
      { populate: ['items', 'items.product'] }
    );

    if (!cart || cart.isDeleted) {
      throw new CustomError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    return cart;
  }

  static getUserById(userId: number): Promise<User | null> {
    return DI.userRepository.findOne(userId);
  }

  static async updateUserCard(userId: number, products: {id: number; count: number;}[]): Promise<Cart> {
    const cart = await DI.cartRepository.findOne(
      { userId },
      { fields: ['id', 'items.product', 'items.count'] }
    );

    if (!cart || cart.isDeleted) {
      throw new CustomError(NO_CART, StatusCodes.NOT_FOUND);
    }

    cart?.items?.add(products.reduce((res, productItem) => {
      const item = DI.itemRepository.create({
        cartId: Reference.createFromPK(Cart, cart.id),
        product: Reference.createFromPK(Product, productItem.id),
        count: productItem.count
      });
      res.push(item);
      return res;
    }, [] as CartItem[]));

    await DI.em.persistAndFlush(cart);

    return cart;
  }

  static async softDeleteUserCard(userId: number): Promise<void> {
    const card = await DI.cartRepository.findOne({ userId });

    if (!card) {
      throw new CustomError(NO_CART, StatusCodes.NOT_FOUND);
    }

    card.isDeleted = true;

    await DI.em.persistAndFlush(card);
  }

  static async createUserOrder(userId: number, data: OrderModel): Promise<Order> {
    const card = await DI.cartRepository.findOne({ userId });

    if (!card || card.isDeleted) {
      throw new CustomError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const delivery: Delivery = DI.deliveryRepository.create(data.delivery);
    const payment: Payment = DI.paymentRepository.create(data.payment);

    const order: Order = DI.orderRepository.create({
      cartId: Reference.createFromPK(Cart, card.id),
      delivery: delivery,
      payment: payment,
      comments: data.comments as string,
      status: data.status as ORDER_STATUS
    } as any);

    await DI.em.persistAndFlush([order, delivery, payment]);

    return DI.orderRepository.findOneOrFail(
      order.id,
      { populate: ['delivery', 'payment', 'cartId.items.product'] }
    );
  }
}
