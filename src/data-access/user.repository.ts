import { User, UserEntity } from '../entities/user.entity.ts';

export class UserRepository {
  static createUser(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    return User.create(user);
  }

  static getUserById(id: string): Promise<UserEntity | null> {
    return User.findById(id);
  }

  static getUserByEmail(email: string): Promise<UserEntity | null> {
    return User.findOne({ email });
  }
}
