import express from 'express';
import { StatusCodes } from 'http-status-codes';

export const healthCheckRouter = express.Router();

healthCheckRouter.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Application is healthy'
  });
});
