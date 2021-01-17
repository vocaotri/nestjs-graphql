import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { CategoryInput } from './inputs/category.input';
import { CategoryUpdate } from './inputs/update.input';
import { identity } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

  async create(createCategory: CategoryInput): Promise<Category> {
    const createdCat = new this.categoryModel(createCategory);
    return await createdCat.save();
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async remove(id:string): Promise<Boolean> {
     await (await this.categoryModel.findById(id)).delete();
     return true;
  }

  async update(updateCategory: CategoryUpdate): Promise<Category> {
    const { id, title, description } = updateCategory;
    const category = await this.categoryModel.findById(id);
    category.title = title;
    category.description = description;
    return await category.save();
  }
}