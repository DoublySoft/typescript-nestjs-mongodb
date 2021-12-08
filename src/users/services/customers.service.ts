import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async create(data: CreateCustomerDto) {
    const newCustomer = new this.customerModel(data);
    return await newCustomer.save();
  }

  async findAll() {
    return await this.customerModel.find();
  }

  async findOne(id: string) {
    const customer = this.customerModel.findById(id);
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  async update(id: string, changes: UpdateCustomerDto) {
    const customer = this.customerModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  async remove(id: string) {
    const customer = await this.customerModel.findByIdAndDelete(id);
    if (!customer) throw new NotFoundException('product.not_found');
    return customer ? true : false;
  }
}
