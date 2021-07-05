import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  @Query(() => Restaurant)
  async Restaurant(@Args('id') id: string): Promise<Restaurant> {
    return await this.restaurantService.findOne(id);
  }
  @Query(() => [Restaurant])
  async allRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantService.findAll();
  }

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('minPrice') minPrice: number,
    @Args('saleValue') saleValue: number,
    @Args('deliveryTime') deliveryTime: string,
    @Args('image') image: string,
  ): Promise<Restaurant> {
    return await this.restaurantService.create({
      name,
      description,
      minPrice,
      saleValue,
      deliveryTime,
      image,
    });
  }
}
