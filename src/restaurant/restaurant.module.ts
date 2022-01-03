import { Module } from '@nestjs/common';
import {
  RestaurantCategoryService,
  RestaurantService,
} from './restaurant.service';
import {
  RestaurantCategoryResolver,
  RestaurantResolver,
} from './restaurant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './Restaurant.entity';
import { RestaurantCategory } from './restaurant-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantCategory])],
  providers: [
    RestaurantService,
    RestaurantResolver,
    RestaurantCategoryService,
    RestaurantCategoryResolver,
  ],
  exports: [RestaurantService, RestaurantCategoryService],
})
export class RestaurantModule {}
