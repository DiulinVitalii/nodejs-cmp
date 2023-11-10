import { UserRepository } from '../data-access/user.repository';
import { UserEntity } from '../entities/user.entity';

export class UserService {
  static createUser(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    return UserRepository.createUser(user);
  }

  static getUserById(id: string): Promise<UserEntity | null> {
    return UserRepository.getUserById(id);
  }
}
