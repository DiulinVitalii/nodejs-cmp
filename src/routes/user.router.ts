import express from 'express';
import { UserService } from '../services/user.service.ts';
import { StatusCodes } from 'http-status-codes';

export const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  try {
    const user = await UserService.createUser();

    res.status(StatusCodes.CREATED).json({ data: user, error: null });
  } catch (e: any) {
    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, error: { message: e.message } });
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const userId: string = req.headers['x-user-id'] as string;
    const user = await UserService.getUserById(userId);

    res.status(StatusCodes.OK).json({ data: user, error: null });
  } catch (e: any) {
    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, error: { message: e.message } });
  }
});
