import express from 'express';
import { AddressInfo } from 'net';
import http from 'http';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import { cartRouter } from './routes/cart.router.ts';
import { productRouter } from './routes/product.router.ts';
import { errorHandler } from './middlewares/error-handler.ts';
import { auth } from './middlewares/auth.ts';
import ormConfig from './config/orm.config.ts';
import { Cart } from './entities/Cart.ts';
import { CartItem } from './entities/CartItem.ts';
import { Product } from './entities/Product.ts';
import { User } from './entities/User.ts';
import { Order } from './entities/Order.ts';
import { Delivery } from './entities/Delivery.ts';
import { Payment } from './entities/Payment.ts';


export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  cartRepository: EntityRepository<Cart>,
  itemRepository: EntityRepository<CartItem>,
  productRepository: EntityRepository<Product>,
  userRepository: EntityRepository<User>,
  orderRepository: EntityRepository<Order>,
  deliveryRepository: EntityRepository<Delivery>,
  paymentRepository: EntityRepository<Payment>,
};

const app = express();

export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(ormConfig);

  DI.em = DI.orm.em;
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.itemRepository = DI.orm.em.getRepository(CartItem);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.orderRepository = DI.orm.em.getRepository(Order);
  DI.deliveryRepository = DI.orm.em.getRepository(Delivery);
  DI.paymentRepository = DI.orm.em.getRepository(Payment);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.use(auth);
  app.use('/api/profile/cart', cartRouter);
  app.use('/api/products', productRouter);
  app.use(errorHandler);

  DI.server = app.listen(3001, () => {
    console.log(`Server is running on port ${(DI.server.address() as AddressInfo).port}`);
  });
})();
