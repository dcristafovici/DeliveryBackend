import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindByKeyInput } from 'src/category/category.dto';
import { AddRestaurantCategoryInput } from './restaurant-category.dto';
import { RestaurantCategory } from './restaurant-category.entity';
import { RestaurantCategoryService } from './restaurant-category.service';

@Resolver()
export class RestaurantCategoryResolver {
  constructor(private restaurantCategoryService: RestaurantCategoryService) {}

  @Query(() => [RestaurantCategory])
  async findRestaurantCategory(): Promise<RestaurantCategory[]> {
    return this.restaurantCategoryService.find();
  }
  @Query(() => RestaurantCategory)
  async findOnefindRestaurantCategory(
    @Args('id') id: string,
  ): Promise<RestaurantCategory> {
    return this.restaurantCategoryService.findOne(id);
  }

  @Query(() => [RestaurantCategory])
  async findByKeyRestaurantCategory(
    @Args('data') data: FindByKeyInput,
  ): Promise<RestaurantCategory[]> {
    return this.restaurantCategoryService.findByKey(data);
  }

  @Mutation(() => RestaurantCategory)
  async createRestaurantCategory(
    @Args('data') data: AddRestaurantCategoryInput,
  ): Promise<RestaurantCategory> {
    return this.restaurantCategoryService.create(data);
  }
}
