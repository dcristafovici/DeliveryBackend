import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  @Query(() => [Restaurant])
  async Restaurants(): Promise<Restaurant[]> {
    return await this.restaurantService.findAll();
  }

  @Query(() => Restaurant)
  async RestaurantByID(@Args('id') id: string): Promise<Restaurant> {
    return await this.restaurantService.findOne(id);
  }

  @Mutation(() => Restaurant)
  async AddRestaurant(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('minPrice') minPrice: string,
    @Args('deliveryTime') deliveryTime: string,
    @Args('sale') sale: string,
  ): Promise<Restaurant> {
    return await this.restaurantService.create({
      name,
      description,
      minPrice,
      deliveryTime,
      sale,
    });
  }

  @Mutation(() => Boolean)
  async RemoveRestaurant(@Args('id') id: string): Promise<boolean> {
    const { affected } = await this.restaurantService.delete(id);
    return affected ? true : false;
  }
}
