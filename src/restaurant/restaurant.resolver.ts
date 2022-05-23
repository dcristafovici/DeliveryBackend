import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindByKeyInput } from 'src/category/category.dto';
import { GraphQLGeneralRequest } from 'src/constants/GraphqlGeneralTypes';
import { ListResult } from 'src/constants/TypeormGeneralTypes';
import { RestaurantCategory } from './restaurant-category.entity';
import {
  AddRestaurantInput,
  RestaurantListConnection,
  UpdateBunchInput,
  UpdateRestaurantInput,
} from './restaurant.dto';
import { Restaurant } from './Restaurant.entity';
import {
  RestaurantCategoryService,
  RestaurantService,
} from './restaurant.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  @Query(() => RestaurantListConnection)
  async findRestaurants(
    @Args('data') data: GraphQLGeneralRequest,
  ): Promise<ListResult<Restaurant>> {
    return this.restaurantService.find(data);
  }
  @Query(() => Restaurant)
  async findOneRestaurant(@Args('id') id: string): Promise<Restaurant> {
    return this.restaurantService.findOne(id);
  }

  @Query(() => [Restaurant])
  async findByKeyRestaurants(
    @Args('data') data: FindByKeyInput,
  ): Promise<Restaurant[]> {
    return this.restaurantService.findByKey(data);
  }

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('data') data: AddRestaurantInput,
  ): Promise<Restaurant> {
    return this.restaurantService.create(data);
  }

  @Mutation(() => Boolean)
  async deleteRestaurant(@Args('id') id: string): Promise<boolean> {
    return this.restaurantService.delete(id);
  }

  @Mutation(() => Restaurant)
  async updateRestaurant(
    @Args('id') id: string,
    @Args('data') data: UpdateRestaurantInput,
  ): Promise<Restaurant> {
    return this.restaurantService.update(id, data);
  }
}

@Resolver(() => [RestaurantCategory])
export class RestaurantCategoryResolver {
  constructor(private restaurantCategoryService: RestaurantCategoryService) {}

  @Query(() => [RestaurantCategory])
  findByKeyResCat(
    @Args('data') data: FindByKeyInput,
  ): Promise<RestaurantCategory[]> {
    return this.restaurantCategoryService.findByKey(data);
  }

  @Mutation(() => Boolean)
  updateResCatBunch(@Args('data') data: UpdateBunchInput) {
    return this.restaurantCategoryService.updateBunch(data);
  }
}
