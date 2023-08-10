import { product, ProductEntity } from '../schemas/product.entity.ts';

class ProductModel {
  private products: ProductEntity[] = [product];

  getProducts(): ProductEntity[] {
    return this.products;
  }

  getProduct(productId: string): ProductEntity | undefined  {
    return this.products.find(p => p.id === productId);
  }
}

export const productModel = new ProductModel();
