import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/custom-error.ts';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ApiResponseModel } from '../models/api-response.model.ts';

export const validateRequestCardData = (req: Request, res: Response<ApiResponseModel>, next: NextFunction): void => {
  const {error} = cardSchema.validate(req.body);
  const message = error?.details.map(d => d.message).join(' ');
  const customError = new CustomError(message || ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);

  error ? next(customError) : next();
}


const cardSchema = Joi.array().items(Joi.object({
  id: Joi.number().required(),
  count: Joi.number().integer().required()
})).required();

