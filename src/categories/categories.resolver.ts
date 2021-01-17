import { Args, Mutation, Query, Resolver, Subscription, ID } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { CategoriesService } from './category.service';
import { CategoryDTO } from './dto/create-category.dto';
import { CategoryInput } from './inputs/category.input'
import { CategoryUpdate } from './inputs/update.input'

const pubSub = new PubSub();

@Resolver()
@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) { }

  // @Query(returns => Category)
  // async recipe(@Args('id') id: string): Promise<Category> {
  //   const recipe = await this.recipesService.findOneById(id);
  //   if (!recipe) {
  //     throw new NotFoundException(id);
  //   }
  //   return recipe;
  // }

  @Query(() => [CategoryDTO])
  async categories() {
    return this.categoriesService.findAll();
  }

  @Mutation(returns => CategoryDTO)
  async addCategory(
    @Args('newCategoryData') newCategoryData: CategoryInput,
  ): Promise<CategoryDTO> {
    const category = await this.categoriesService.create(newCategoryData);
    pubSub.publish('recipeAdded', { recipeAdded: category });
    return category;
  }

  @Mutation(returns => CategoryDTO)
  async updateCategory(
    @Args('updateCategoryData') updateCategoryData: CategoryUpdate,
  ): Promise<CategoryDTO> {
    const category = await this.categoriesService.update(updateCategoryData);
    return category;
  }

  @Mutation(returns => Boolean)
  async removeCategory(@Args('id') id: string) {
    return this.categoriesService.remove(id);
  }

  @Subscription(returns => CategoryDTO)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }
}