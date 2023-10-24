import { UserRepository } from '../data-access/user.repository.ts';
import { UserEntity } from '../entities/user.entity.ts';

export class UserService {
  static createUser(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    return UserRepository.createUser(user);
  }

  static getUserById(id: string): Promise<UserEntity | null> {
    return UserRepository.getUserById(id);
  }
}
