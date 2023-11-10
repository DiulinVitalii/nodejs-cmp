import { CustomError } from '../utils/custom-error';
import { NO_PRODUCT } from '../utils/constants';
import { StatusCodes } from 'http-status-codes';
import { Product, ProductEntity } from '../entities/product.entity';

export class ProductRepository {
  static getProducts(): Promise<ProductEntity[]> {
    return Product.find();
  }

  static async getProduct(productId: string): Promise<ProductEntity>  {
    const product = await Product.findById(productId);
    if (!product) {
      throw new CustomError(NO_PRODUCT, StatusCodes.NOT_FOUND);
    }

    return product;
  }
}
