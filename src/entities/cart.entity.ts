import mongoose, { Model, Schema } from 'mongoose';
import { ProductEntity } from './product.entity.ts';

export interface CartItemEntity {
  product: ProductEntity
  count: number;
}

export interface CartEntity {
  id: string; // uuid
  userId: string | mongoose.Schema.Types.ObjectId;
  isDeleted: boolean;
  items: CartItemEntity[];
}


const CartEntitySchema: Schema<CartEntity> = new mongoose.Schema<CartEntity>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    count: {
      type: Number,
      required: true
    },
  }],
}, { versionKey: false });

CartEntitySchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.isDeleted;
  },
});

export const Cart: Model<CartEntity> = mongoose.model("Cart", CartEntitySchema);

