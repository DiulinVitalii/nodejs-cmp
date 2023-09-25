import { CartRepository } from '../data-access/cart.repository.ts';
import { Cart } from '../entities/Cart.ts';
import { User } from '../entities/User.ts';
import { Order } from '../entities/Order.ts';
import { OrderModel } from '../models/order.model.ts';

export class CardService {
  static createUserCard(userId: number): Promise<Cart> {
    return CartRepository.createUserCard(userId);
  }

  static getUserCard(userId: number): Promise<Cart> {
    return CartRepository.getUserCard(userId);
  }

  static getUserById(userId: number): Promise<User |null> {
    return CartRepository.getUserById(userId);
  }

  static updateUserCard(userId: number, products: { id: number; count: number; }[]): Promise<Cart> {
    return CartRepository.updateUserCard(userId, products);
  }

  static async softDeleteUserCard(userId: number): Promise<void> {
    await CartRepository.softDeleteUserCard(userId);
  }

  static createUserOrder(userId: number, data: OrderModel): Promise<Order> {
    return CartRepository.createUserOrder(userId, data);
  }
}
