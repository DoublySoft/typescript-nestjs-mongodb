import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const model = await newUser.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`user.not_found`);
    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!user) throw new NotFoundException(`user.not_found`);
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException(`user.not_found`);
    return user ? true : false;
  }

  async getOrderByUser(id: string) {
    const user = this.userModel.findById(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
