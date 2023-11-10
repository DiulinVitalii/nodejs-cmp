import { UserRepository } from './user.repository';
import { Product } from '../entities/product.entity';

export class DataSeedRepository {
  static async createDataSeed() {
    for (let i = 0; i < 10; i++) {
      await Product.create({
        title: `Iphone ${i + 1}`,
        price: 1000 + i * 100,
        description: 'This is a phone',
      });
    }
  }
}
