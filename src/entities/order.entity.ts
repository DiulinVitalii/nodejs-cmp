import { CartEntity, CartItemEntity } from './cart.entity';
import mongoose, { Model, Schema } from 'mongoose';

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  id: string, // uuid
  userId: string | mongoose.Schema.Types.ObjectId;
  cartId: string | mongoose.Schema.Types.ObjectId;
  items: CartItemEntity[] // products from CartEntity
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

const OrderEntitySchema: Schema<OrderEntity> = new mongoose.Schema<OrderEntity>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  payment: {
    type: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    creditCard: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    }
  },
  delivery: {
    type: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    }
  },
  comments: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
}, { versionKey: false });

OrderEntitySchema.virtual('total').get(function () {
  if (this.cartId) {
    return (this.cartId as any as CartEntity).items.reduce((acc: number, item: CartItemEntity) => acc + item.product.price * item.count, 0);
  }
});

OrderEntitySchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Order: Model<OrderEntity> = mongoose.model("Order", OrderEntitySchema);
