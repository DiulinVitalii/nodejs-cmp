import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CardService } from '../services/card.service';
import { validateRequestCardData } from '../middlewares/validate-reuqest-card-data';
import { ApiResponseModel } from '../models/api-response.model';
import { SOMETHING_WENT_WRONG } from '../utils/constants';
import { OrderModel } from '../models/order.model';
import { CartEntity } from '../entities/cart.entity';
import { OrderEntity } from '../entities/order.entity';
import { isAdmin } from '../middlewares/is-admin';
import { debuglog } from '../configs/debug';
export const cartRouter = express.Router();

cartRouter.post('/', async (req: Request, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    const card: CartEntity = await CardService.createUserCard(userId);

    debuglog(`created cart = ${JSON.stringify(card)}`);

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
    const card: CartEntity = await CardService.getUserCard(userId);

    debuglog(`cart with userID=${userId} = ${JSON.stringify(card)}`);

    res.status(StatusCodes.OK).json({ data: card, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});

cartRouter.put('/', validateRequestCardData, async (req: Request<any, any, {id: string; count: number;}[]>, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    const updatedCard: CartEntity = await CardService.updateUserCard(userId, req.body);

    debuglog(`updated cart with userID=${userId} = ${JSON.stringify(updatedCard)}`);

    res.status(StatusCodes.OK).json({ data: updatedCard, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});

cartRouter.delete('/', isAdmin, async (req: Request, res: Response<ApiResponseModel>): Promise<void> => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    await CardService.softDeleteUserCard(userId);

    debuglog(`deleted cart with userID=${userId}`);

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
    const order: OrderEntity = await CardService.createUserOrder(userId, req.body);

    debuglog(`created an order with userID=${userId} = ${JSON.stringify(order)}`);

    res.status(StatusCodes.CREATED).json({ data: order, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});
