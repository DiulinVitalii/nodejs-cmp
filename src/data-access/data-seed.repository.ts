import { UserRepository } from './user.repository.ts';
import { Product } from '../entities/product.entity.ts';

export class DataSeedRepository {
  static async createDataSeed() {
    await UserRepository.createUser({ email: 'test@gmail.com', password: '123456', role: 'admin' });
    await UserRepository.createUser({ email: 'test2@gmail.com', password: '123453', role: 'user' });

    for (let i = 0; i < 10; i++) {
      await Product.create({
        title: `Iphone ${i + 1}`,
        price: 1000 + i * 100,
        description: 'This is a phone',
      });
    }
  }
}
