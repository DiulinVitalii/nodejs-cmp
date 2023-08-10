import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CardService } from '../services/card.service.ts';
import { validateRequestCardData } from '../middlewares/validate-reuqest-card-data.ts';
import { CartItemEntity, UserCard } from '../schemas/cart.entity.ts';
import { OrderEntity } from '../schemas/order.entity.ts';
import { ApiResponse } from '../interfaces/api-response.ts';

export const cardRouter = express.Router();

cardRouter.post('/', (req: Request, res: Response<ApiResponse>): void => {
  const userId: string = req.headers['x-user-id'] as string;
  const card: UserCard = CardService.createUserCard(userId);

  res.status(StatusCodes.CREATED).json({ data: card, error: null });
});

cardRouter.get('/', (req: Request, res: Response<ApiResponse>): void => {
  const userId: string = req.headers['x-user-id'] as string;
  const card: UserCard = CardService.getUserCard(userId);

  res.status(StatusCodes.OK).json({ data: card, error: null });
});

cardRouter.put('/', validateRequestCardData, (req: Request<any, any, CartItemEntity[]>, res: Response<ApiResponse>): void => {
  const userId: string = req.headers['x-user-id'] as string;
  const updatedCard: UserCard = CardService.updateUserCard(userId, req.body);

  res.status(StatusCodes.OK).json({ data: updatedCard, error: null });
});

cardRouter.delete('/', (req: Request, res: Response<ApiResponse>): void => {
  const userId: string = req.headers['x-user-id'] as string;
  CardService.softDeleteUserCard(userId);

  res.status(StatusCodes.OK).json({ data: { success: true }, error: null });
});

cardRouter.post('/checkout', (req: Request<any, any, Partial<OrderEntity>>, res: Response<ApiResponse>): void => {
  const userId: string = req.headers['x-user-id'] as string;
  const order: OrderEntity = CardService.createUserOrder(userId, req.body);

  res.status(StatusCodes.CREATED).json({ data: order, error: null });
});
