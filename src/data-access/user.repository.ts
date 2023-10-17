import { User, UserEntity } from '../entities/user.entity.ts';

export class UserRepository {
  static createUser(): Promise<UserEntity> {
    return User.create({});
  }

  static getUserById(id: string): Promise<UserEntity | null> {
    return User.findById(id);
  }
}
