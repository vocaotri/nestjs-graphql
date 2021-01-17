import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CategorySchema } from './categories.schema';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './category.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
  providers: [
    CategoriesResolver,
    CategoriesService,
  ],
})
export class CategoriesModule { }