import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/custom-error.ts';
import { ApiResponseModel } from '../models/api-response.model.ts';
import { AUTH_ERROR } from '../utils/constants.ts';
import { UserRepository } from '../data-access/user.repository.ts';

export const auth = async (req: Request, res: Response<ApiResponseModel>, next: NextFunction) => {
  const userId: string = req.headers['x-user-id'] as string;

  if (userId) {
    const user = await UserRepository.getUserById(userId);
    if (user) {
      return next();
    }
  }

  const error = new CustomError(AUTH_ERROR, StatusCodes.UNAUTHORIZED);

  next(error);
}
