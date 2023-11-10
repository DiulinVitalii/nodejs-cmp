import { ProductRepository } from '../data-access/product.repository';
import { ProductEntity } from '../entities/product.entity';

export class ProductService {
  static getProducts(): Promise<ProductEntity[]> {
    return ProductRepository.getProducts();
  }

  static getProduct(productId: string): Promise<ProductEntity> {
    return ProductRepository.getProduct(productId);
  }
}
