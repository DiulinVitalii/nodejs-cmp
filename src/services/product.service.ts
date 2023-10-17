import { ProductRepository } from '../data-access/product.repository.ts';
import { ProductEntity } from '../entities/product.entity.ts';

export class ProductService {
  static getProducts(): Promise<ProductEntity[]> {
    return ProductRepository.getProducts();
  }

  static getProduct(productId: string): Promise<ProductEntity> {
    return ProductRepository.getProduct(productId);
  }
}
