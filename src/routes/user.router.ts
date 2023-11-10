import express, { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { StatusCodes } from 'http-status-codes';
import { UserEntity } from '../entities/user.entity';

export const userRouter = express.Router();

userRouter.post('/', async (req: Request<any, any, Omit<UserEntity, 'id'>>, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);

    res.status(StatusCodes.CREATED).json({ data: user, error: null });
  } catch (e: any) {
    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, error: { message: e.message } });
  }
});

userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    const user = await UserService.getUserById(userId);

    res.status(StatusCodes.OK).json({ data: user, error: null });
  } catch (e: any) {
    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, error: { message: e.message } });
  }
});
