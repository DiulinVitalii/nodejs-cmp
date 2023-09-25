import express, { Request, Response } from 'express';
import { ProductService } from '../services/product.service.ts';
import { StatusCodes } from 'http-status-codes';
import { ApiResponseModel } from '../models/api-response.model.ts';
import { SOMETHING_WENT_WRONG } from '../utils/constants.ts';
import { Product } from '../entities/Product.ts';

export const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const products: Product[] = await ProductService.getProducts();

    res.status(StatusCodes.OK).json({ data: products, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});

productRouter.get('/:id', async (req: Request<{ id: string }>, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const { id: productId } = req.params;
    const product: Product = await ProductService.getProduct(+productId);

    res.status(StatusCodes.OK).json({ data: product, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});


