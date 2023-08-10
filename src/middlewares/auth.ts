import { NextFunction, Request, Response } from 'express';
import { CardService } from '../services/card.service.ts';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/custom-error.ts';
import { ApiResponse } from '../interfaces/api-response.ts';
import { AUTH_ERROR } from '../utils/constants.ts';

export const auth = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
  const userId: string = req.headers['x-user-id'] as string;

  if (userId) {
    const user = CardService.getUserById(userId);
    if (user) {
      return next();
    }
  }

  const error = new CustomError(AUTH_ERROR, StatusCodes.UNAUTHORIZED);

  next(error);
}
