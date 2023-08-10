import express from 'express';
import { AddressInfo } from 'net';
import { cardRouter } from './routes/card.router.ts';
import { productRouter } from './routes/product.router.ts';
import { errorHandler } from './middlewares/error-handler.ts';
import { auth } from './middlewares/auth.ts';

const app = express();

app.use(express.json());
app.use(auth);
app.use('/api/profile/card', cardRouter);
app.use('/api/products', productRouter);
app.use(errorHandler);

const server = app.listen(3001, () => {
  console.log(`Server is running on port ${(server.address() as AddressInfo).port}`);
});
