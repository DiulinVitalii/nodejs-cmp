import mongoose from 'mongoose';
import dotenv, { DotenvConfigOutput } from 'dotenv';


const configResult: DotenvConfigOutput = dotenv.config();
if (configResult.error) {
  throw configResult.error;
}

export const dbConnect = () => {
  return mongoose.connect(`mongodb://localhost:${process.env.MONGODB_PORT}`, {
    dbName: process.env.MONGODB_NAME,
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
}
