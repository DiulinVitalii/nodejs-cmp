import { v4 as uuidv4 } from 'uuid';
import { user, UserEntity } from '../schemas/user.entity.ts';
import { cart, CartEntity, CartItemEntity, UserCard } from '../schemas/cart.entity.ts';
import { OrderEntity } from '../schemas/order.entity.ts';
import { ORDER_STATUS } from '../utils/constants.ts';

class CardModel {
  private users: UserEntity[] = [user];
  private cards: CartEntity[] = [cart];

  createUserCard(userId: string): UserCard {
    const userCard: CartEntity = {
      id: uuidv4(),
      userId,
      isDeleted: false,
      items: []
    }

    this.cards.push(userCard);
    const { userId: _, isDeleted: __, ...card } = userCard;

    return { card, totalPrice: 0 };
  }

  softCreateUserCard(userId: string): UserCard {
    const index = this.findIndexUserCard(userId);
    this.cards[index].isDeleted = false;
    const { userId: _, isDeleted: __, ...card } = this.cards[index];

    return { card, totalPrice: 0 };
  }

  getUserCard(userId: string): Partial<CartEntity> | null {
    const userCard = this.findUserCard(userId);
    if (userCard) {
      const { userId: _, ...card } = userCard;

      return card;
    }

    return null;
  }

  getUserById(userId: string): UserEntity | null {
    return this.users.find(u => u.id === userId) || null;
  }

  updateUserCard(userId: string, products: CartItemEntity[]): Partial<CartEntity> {
    const index = this.findIndexUserCard(userId);
    this.cards[index].items = products;

    const { userId: _, isDeleted: __, ...card } = this.cards[index];

    return card;
  }

  softDeleteUserCard(userId: string): void {
    const index = this.findIndexUserCard(userId);
    this.cards[index].items = [];
    this.cards[index].isDeleted = true;
  }

  createUserOrder(userId: string, data: Partial<OrderEntity>): OrderEntity {
    const card = this.findUserCard(userId);

    return {
      id: uuidv4(),
      cartId: card?.id,
      userId: card?.userId,
      items: card?.items,
      status: ORDER_STATUS.CREATED,
      ...data
    } as OrderEntity;
  }

  private findUserCard(userId: string): CartEntity | null {
    return this.cards.find(c => c.userId === userId) || null;
  }

  private findIndexUserCard(userId: string): number {
    return this.cards.findIndex(c => c.userId === userId);
  }
}

export const cardModel = new CardModel();

