import { ProductEntity } from '../schemas/product.entity.ts';
import { productModel } from '../models/product.model.ts';
import { CustomError } from '../utils/custom-error.ts';
import { StatusCodes } from 'http-status-codes';
import { NO_PRODUCT } from '../utils/constants.ts';

export class ProductService {
  static getProducts(): ProductEntity[] {
    return productModel.getProducts();
  }

  static getProduct(productId: string): ProductEntity {
    const product = productModel.getProduct(productId);

    if (!product) {
      throw new CustomError(NO_PRODUCT, StatusCodes.NOT_FOUND);
    }

    return product;
  }
}
