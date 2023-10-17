import express from 'express';
import { AddressInfo } from 'net';
import { cartRouter } from './routes/cart.router.ts';
import { productRouter } from './routes/product.router.ts';
import { errorHandler } from './middlewares/error-handler.ts';
import { auth } from './middlewares/auth.ts';
import { dbConnect } from './configs/db.ts';
import { userRouter } from './routes/user.router.ts';
import { dataSeedRouter } from './routes/data-seed.router.ts';

const app = express();

app.use(express.json());
app.use('/api/profile/cart', auth, cartRouter);
app.use('/api/products', auth, productRouter);
app.use('/api/profile/user', userRouter);
app.use('/api/data-seed', dataSeedRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await dbConnect();
    const server = app.listen(3001, () => {
      console.log(`Server is running on port ${(server.address() as AddressInfo).port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

