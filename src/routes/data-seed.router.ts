import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { DataSeedService } from '../services/data-seed.service';

export const dataSeedRouter = express.Router();

dataSeedRouter.post('/', async (req, res) => {
  try {
    await DataSeedService.createDataSeed();

    res.status(StatusCodes.CREATED).json({ data: null, error: null });
  } catch (e: any) {
    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, error: { message: e.message } });
  }
});
