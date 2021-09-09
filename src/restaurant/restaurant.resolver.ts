import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AddRestaurantInput } from './restaurant.dto';
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
    @Args('data') data: AddRestaurantInput,
  ): Promise<Restaurant> {
    return await this.restaurantService.create(data);
  }

  @Mutation(() => Boolean)
  async RemoveRestaurant(@Args('id') id: string): Promise<boolean> {
    const { affected } = await this.restaurantService.delete(id);
    return affected ? true : false;
  }
}
