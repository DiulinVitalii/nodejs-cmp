import express from 'express';
import { AddressInfo, Socket } from 'net';
import { cartRouter } from './routes/cart.router';
import { productRouter } from './routes/product.router';
import { errorHandler } from './middlewares/error-handler';
import { verifyToken } from './middlewares/verify-token';
import { dbConnect } from './configs/db';
import { userRouter } from './routes/user.router';
import { dataSeedRouter } from './routes/data-seed.router';
import { authRouter } from './routes/auth.router';
import { UserEntity } from './entities/user.entity';
import http from 'http';
import mongoose from 'mongoose';
import { healthCheckRouter } from './routes/healthCheck.router';
import { logger } from './configs/winston';
import dotenv, { DotenvConfigOutput } from 'dotenv';

const configResult: DotenvConfigOutput = dotenv.config();
if (configResult.error) {
  throw configResult.error;
}

declare global {
  namespace Express {
    interface Request {
      user: Omit<UserEntity, 'id'>
    }
  }
}

const app = express()
;
app.use(require('morgan')('combined'));
app.use(express.json());
app.use('/health', healthCheckRouter);
app.use('/api/profile/cart', verifyToken, cartRouter);
app.use('/api/products', verifyToken, productRouter);
app.use('/api/profile/user', verifyToken,  userRouter);
app.use('/api/data-seed', dataSeedRouter);
app.use('/api/', authRouter);
app.use(errorHandler);

let server: http.Server;
let connections: Socket[] = [];

const start = async () => {
  try {
    await dbConnect();
    const port = Number(process.env.PORT) || 3000;
    server = app.listen(port, () => {
      logger.info(`Server is running on port ${(server.address() as AddressInfo).port}`);
    });
    server.on('connection', (connection: Socket) => {
      // register connections
      connections.push(connection);

      // remove/filter closed connections
      connection.on('close', () => {
        connections = connections.filter((currentConnection) => currentConnection !== connection);
      });
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

start();

function shutdown() {
  logger.info('Received kill signal, shutting down gracefully');

  // Close the Mongoose connection
  mongoose.connection.close();

  server.close(() => {
    logger.info('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 20000);

  // end current connections
  connections.forEach((connection) => connection.end());

  // then destroy connections
  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

