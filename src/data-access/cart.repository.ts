import { CustomError } from '../utils/custom-error.ts';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NO_CART } from '../utils/constants.ts';
import { OrderModel } from '../models/order.model.ts';
import { Cart, CartEntity } from '../entities/cart.entity.ts';
import { ProductEntity } from '../entities/product.entity.ts';
import { Order, OrderEntity } from '../entities/order.entity.ts';

export class CartRepository {
  static async createUserCard(userId: string): Promise<CartEntity> {
    const cart = await Cart.findById(userId).populate('items.product');

    if (!cart || cart?.isDeleted) {
      const newCart: CartEntity = await Cart.create({
        userId: userId,
        isDeleted: false
      });
      if (cart) {
        cart.items = newCart.items;
        await cart.save();
      }

      return cart || newCart;
    }

    throw new CustomError(`Card for user id ${userId} already exist`, StatusCodes.CONFLICT);
  }

  static async getUserCard(userId: string): Promise<CartEntity> {
    const cart = await Cart.findOne({ userId }).populate('items.product');

    if (!cart || cart.isDeleted) {
      throw new CustomError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    return cart;
  }

  static async updateUserCard(userId: string, products: {id: string; count: number;}[]): Promise<CartEntity> {
    const cart = await Cart.findOne({ userId }).populate('items.product');

    if (!cart || cart.isDeleted) {
      throw new CustomError(NO_CART, StatusCodes.NOT_FOUND);
    }
    products.forEach( productItem => {
      const item = cart.items.find(item => item.product.id === productItem.id);
      if (item) {
        item.count = productItem.count;
      } else {
        cart.items.push({
          product: productItem.id as any as ProductEntity,
          count: productItem.count
        });
      }
    });

    return cart;
  }

  static async softDeleteUserCard(userId: string): Promise<void> {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new CustomError(NO_CART, StatusCodes.NOT_FOUND);
    }

    cart.isDeleted = true;

    await cart.save();
  }

  static async createUserOrder(userId: string, data: OrderModel): Promise<OrderEntity> {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.isDeleted) {
      throw new CustomError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const order: OrderEntity = await Order.create({
      userId: userId,
      cartId: cart.id,
      delivery: data.delivery,
      payment: data.payment,
      comments: data.comments,
      status: data.status
    });

    return Order.findById(order.id).populate('cartId') as any as OrderEntity;
  }
}
