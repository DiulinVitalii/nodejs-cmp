import { cardModel } from '../models/card.model.ts';
import { CustomError } from '../utils/custom-error.ts';
import { CartEntity, CartItemEntity, UserCard } from '../schemas/cart.entity.ts';
import { UserEntity } from '../schemas/user.entity.ts';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { OrderEntity } from '../schemas/order.entity.ts';
import { NO_CARD } from '../utils/constants.ts';

export class CardService {
  static createUserCard(userId: string): UserCard {
    const card = cardModel.getUserCard(userId);

    if (!card) {
      return cardModel.createUserCard(userId);
    }

    if (card && card.isDeleted) {
      return cardModel.softCreateUserCard(userId);
    }

    throw new CustomError(`Card for user id ${userId} already exist`, StatusCodes.CONFLICT);
  }

  static getUserCard(userId: string): UserCard {
    const data = cardModel.getUserCard(userId);

    if (!data || data.isDeleted) {
      throw new CustomError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const { isDeleted: __, ...card } = data;

    return data ? { card, totalPrice: this.getTotalPrice(data) } : this.createUserCard(userId);
  }

  static getUserById(userId: string): UserEntity | null {
    return cardModel.getUserById(userId);
  }

  static updateUserCard(userId: string, products: CartItemEntity[]): UserCard {
    const card = cardModel.getUserCard(userId);

    if (!card || card.isDeleted) {
      throw new CustomError(NO_CARD, StatusCodes.NOT_FOUND);
    }

    return { card: cardModel.updateUserCard(userId, products), totalPrice: this.getTotalPrice(card) };
  }

  static softDeleteUserCard(userId: string): void {
    const card = cardModel.getUserCard(userId);

    if (!card) {
      throw new CustomError(NO_CARD, StatusCodes.NOT_FOUND);
    }

    cardModel.softDeleteUserCard(userId);
  }

  static createUserOrder(userId: string, data: Partial<OrderEntity>): OrderEntity {
    const card = cardModel.getUserCard(userId);

    if (!card || card.isDeleted) {
      throw new CustomError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const order = cardModel.createUserOrder(userId, data);
    order.total = this.getTotalPrice(card);

    return order;
  }

  private static getTotalPrice(userCard: Partial<CartEntity>): number {
    return userCard?.items?.reduce((res, item) => {
      res += item.product.price * item.count;
      return res;
    }, 0) || 0;
  }
}
