import { UpdateOrderDto } from './../dtos/oder.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './../entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dtos/oder.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return await newOrder.save();
  }

  async findAll() {
    return await this.orderModel
      .find()
      .populate('customer')
      .populate('products');
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) new NotFoundException('order.not_found');
    return order;
  }

  async update(id: string, changes: UpdateOrderDto) {
    const order = await this.orderModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!order) new NotFoundException('order.not_found');
    return order;
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) new NotFoundException('order.not_found');
    return order ? true : false;
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    if (!order) new NotFoundException('order.not_found');
    order.products.pull(productId);
    return order;
  }

  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findByIdAndUpdate(id, {
      $addToSet: { products: productsIds },
      new: true,
    });
    if (!order) new NotFoundException('order.not_found');
    return order;
  }
}
