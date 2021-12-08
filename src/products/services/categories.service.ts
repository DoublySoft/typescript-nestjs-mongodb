import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    const newCategory = new this.categoryModel(data);
    return await newCategory.save();
  }

  async findAll() {
    return await this.categoryModel.find();
  }

  async findOne(id: string) {
    const category = this.categoryModel.findById(id);
    if (!category) throw new NotFoundException('category.not_found');
    return category;
  }

  async update(id: string, changes: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!category) throw new NotFoundException('category.not_found');
    return category;
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) throw new NotFoundException('category.not_found');
    return category ? true : false;
  }
}
