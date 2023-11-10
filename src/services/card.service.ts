import { CartRepository } from '../data-access/cart.repository';
import { OrderModel } from '../models/order.model';
import { CartEntity } from '../entities/cart.entity';
import { OrderEntity } from '../entities/order.entity';

export class CardService {
  static createUserCard(userId: string): Promise<CartEntity> {
    return CartRepository.createUserCard(userId);
  }

  static getUserCard(userId: string): Promise<CartEntity> {
    return CartRepository.getUserCard(userId);
  }

  static updateUserCard(userId: string, products: { id: string; count: number; }[]): Promise<CartEntity> {
    return CartRepository.updateUserCard(userId, products);
  }

  static async softDeleteUserCard(userId: string): Promise<void> {
    await CartRepository.softDeleteUserCard(userId);
  }

  static createUserOrder(userId: string, data: OrderModel): Promise<OrderEntity> {
    return CartRepository.createUserOrder(userId, data);
  }
}
