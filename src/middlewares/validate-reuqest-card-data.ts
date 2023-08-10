import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/custom-error.ts';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../interfaces/api-response.ts';

export const validateRequestCardData = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
  const {error} = cardSchema.validate(req.body);
  const message = error?.details.map(d => d.message).join(' ');
  const customError = new CustomError(message || ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);

  error ? next(customError) : next();
}


const cardSchema = Joi.array().items(Joi.object({
  product: {
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required()
  },
  count: Joi.number().integer().required()
})).required();

