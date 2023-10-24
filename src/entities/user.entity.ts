import mongoose, { Model, Schema } from 'mongoose';

export interface UserEntity {
  id: string; // uuid
  email: string;
  password: string;
  role: string;
}


const UserEntitySchema: Schema<UserEntity> = new mongoose.Schema<UserEntity>({
  email: { type: String, unique: true },
  password: { type: String },
  role: {type: String},
}, { versionKey: false });

UserEntitySchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

UserEntitySchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const User: Model<UserEntity> = mongoose.model("User", UserEntitySchema);

