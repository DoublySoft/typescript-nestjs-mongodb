import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { ProductsModule } from '../products/products.module';

import { User, UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
