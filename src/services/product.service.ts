import { ProductRepository } from '../data-access/product.repository.ts';
import { Product } from '../entities/Product.ts';

export class ProductService {
  static getProducts(): Promise<Product[]> {
    return ProductRepository.getProducts();
  }

  static getProduct(productId: number): Promise<Product> {
    return ProductRepository.getProduct(productId);
  }
}
