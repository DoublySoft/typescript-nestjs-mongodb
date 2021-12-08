import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { OrderController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

import { ProductsModule } from '../products/products.module';

import { User, UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [CustomerController, UsersController, OrderController],
  providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule {}
