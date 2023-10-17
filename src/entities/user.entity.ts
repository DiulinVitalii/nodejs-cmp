import mongoose, { Model, Schema } from 'mongoose';

export interface UserEntity {
  id: string; // uuid
}


const UserEntitySchema: Schema<UserEntity> = new mongoose.Schema<UserEntity>({}, { versionKey: false });

UserEntitySchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const User: Model<UserEntity> = mongoose.model("User", UserEntitySchema);

