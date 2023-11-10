import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FORBIDDEN } from '../utils/constants';

export async function isAdmin (req: Request, res: Response, next: NextFunction) {
  const { user } = req;

  if (user.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).send(FORBIDDEN);
  }

  return next();
}
