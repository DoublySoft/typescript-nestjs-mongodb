import { MongoIdPipe } from './../../common/mongo-id.pipe';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { OrdersService } from '../services/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  AddProductsToOrderDto,
} from './../dtos/oder.dto';

@Controller('orders')
export class OrderController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.remove(id);
  }

  @Put(':id/products')
  addProducts(@Param('id') id: string, @Body() payload: AddProductsToOrderDto) {
    return this.ordersService.addProducts(id, payload.productsIds);
  }

  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }
}
