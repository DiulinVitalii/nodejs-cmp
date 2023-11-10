import express, { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { StatusCodes } from 'http-status-codes';
import { ApiResponseModel } from '../models/api-response.model';
import { SOMETHING_WENT_WRONG } from '../utils/constants';
import { ProductEntity } from '../entities/product.entity';
import { debuglog } from '../configs/debug';

export const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const products: ProductEntity[] = await ProductService.getProducts();

    debuglog(`get products = ${JSON.stringify(products)}`);

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
    const product: ProductEntity = await ProductService.getProduct(productId);

    debuglog(`get prduct with productId=${productId} = ${JSON.stringify(product)}`);

    res.status(StatusCodes.OK).json({ data: product, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});


