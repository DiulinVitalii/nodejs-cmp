import mongoose, { Model, Schema } from 'mongoose';

export interface ProductEntity {
  _id: string; // uuid
  id: string;
  title: string;
  description: string;
  price: number;
}

const ProductEntitySchema: Schema<ProductEntity> = new mongoose.Schema<ProductEntity>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

ProductEntitySchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Product: Model<ProductEntity> = mongoose.model("Product", ProductEntitySchema);

