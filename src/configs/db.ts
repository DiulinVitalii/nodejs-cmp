import mongoose from 'mongoose';
import { logger } from './winston';

export const dbConnect = () => {
  return mongoose.connect(process.env.MONGODB_URL as string, {
    dbName: process.env.MONGODB_NAME,
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
  })
    .then(() => logger.info('Connected to MongoDB'))
    .catch((error) => logger.error('MongoDB connection error:', error));
}
