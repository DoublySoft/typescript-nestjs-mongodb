import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  create(data: CreateBrandDto) {
    const createBrand = new this.brandModel(data);
    return createBrand.save();
  }

  async findAll() {
    return await this.brandModel.find();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async update(id: string, changes: UpdateBrandDto) {
    const brand = await this.brandModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!brand) throw new NotFoundException(`Brand #${id} not found`);
    return brand;
  }

  async remove(id: string) {
    const brand = await this.brandModel.findByIdAndDelete(id);
    if (!brand) throw new NotFoundException('brand.not_found');
    return brand ? true : false;
  }
}
