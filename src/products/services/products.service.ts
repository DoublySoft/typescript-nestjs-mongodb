import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice)
        filters.price = { $gte: minPrice, $lte: maxPrice };
      return this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit);
    }
    return this.productModel.find().populate('brand');
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException(`product.not_found`);
    return product;
  }

  async update(id: string, changes: UpdateQuery<UpdateProductDto>) {
    const product = await this.productModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!product) throw new NotFoundException(`product.not_found`);
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('product.not_found');
    return product ? true : false;
  }
}
