import express, { Request, Response } from 'express';
import { ProductService } from '../services/product.service.ts';
import { ProductEntity } from '../schemas/product.entity.ts';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../interfaces/api-response.ts';

export const productRouter = express.Router();

productRouter.get('/', (req: Request, res: Response<ApiResponse>) => {
  const products: ProductEntity[] = ProductService.getProducts();

  res.status(StatusCodes.OK).json({ data: products, error: null });
});

productRouter.get('/:id', (req: Request<{ id: string }>, res: Response<ApiResponse>) => {
  const { id: productId } = req.params;
  const product: ProductEntity = ProductService.getProduct(productId);

  res.status(StatusCodes.OK).json({ data: product, error: null });
});


