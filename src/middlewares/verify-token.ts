import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserEntity } from '../entities/user.entity.ts';
import { StatusCodes } from 'http-status-codes';
import { INVALID_TOKEN, TOKEN_REQUIRED } from '../utils/constants.ts';

export async function verifyToken (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).send(TOKEN_REQUIRED);
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(StatusCodes.FORBIDDEN).send(INVALID_TOKEN);
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as Omit<UserEntity, 'id'>;

    req.user = user;
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).send(INVALID_TOKEN);
  }
  return next();
}
