import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CardService } from '../services/card.service.ts';
import { validateRequestCardData } from '../middlewares/validate-reuqest-card-data.ts';
import { ApiResponseModel } from '../models/api-response.model.ts';
import { SOMETHING_WENT_WRONG } from '../utils/constants.ts';
import { Order } from '../entities/Order.ts';
import { Cart } from '../entities/Cart.ts';
import { OrderModel } from '../models/order.model.ts';

export const cartRouter = express.Router();

cartRouter.post('/', async (req: Request, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    const card: Cart = await CardService.createUserCard(+userId);

    res.status(StatusCodes.CREATED).json({ data: card, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});

cartRouter.get('/', async (req: Request, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    const card: Cart = await CardService.getUserCard(+userId);

    res.status(StatusCodes.OK).json({ data: card, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});

cartRouter.put('/', validateRequestCardData, async (req: Request<any, any, {id: number; count: number;}[]>, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    const updatedCard: Cart = await CardService.updateUserCard(+userId, req.body);

    res.status(StatusCodes.OK).json({ data: updatedCard, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});

cartRouter.delete('/', async (req: Request, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    await CardService.softDeleteUserCard(+userId);

    res.status(StatusCodes.OK).json({ data: { success: true }, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});

cartRouter.post('/checkout', async (req: Request<any, any, OrderModel>, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    const order: Order = await CardService.createUserOrder(+userId, req.body);

    res.status(StatusCodes.CREATED).json({ data: order, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});
