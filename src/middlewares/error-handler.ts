import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../interfaces/api-response.ts';
import { SOMETHING_WENT_WRONG } from '../utils/constants.ts';

export const errorHandler = (e: any, req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
  console.error('errorHandler = ', e);
  const errorData = {
    data: null,
    error: { message: e.message || SOMETHING_WENT_WRONG }
  };

  res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
}
