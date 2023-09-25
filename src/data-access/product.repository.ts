import { DI } from '../index.ts';
import { CustomError } from '../utils/custom-error.ts';
import { NO_PRODUCT } from '../utils/constants.ts';
import { StatusCodes } from 'http-status-codes';
import { Product } from '../entities/Product.ts';

export class ProductRepository {
  static getProducts(): Promise<Product[]> {
    return DI.productRepository.findAll();
  }

  static getProduct(productId: number): Promise<Product>  {
    try {
      return DI.productRepository.findOneOrFail(productId);
    } catch (e) {
      throw new CustomError(NO_PRODUCT, StatusCodes.NOT_FOUND);
    }
  }
}
