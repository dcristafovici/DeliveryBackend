import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './Restaurant.entity';
import { RestaurantCategory } from './restaurant-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantCategory])],
  providers: [RestaurantService, RestaurantResolver],
  exports: [RestaurantService],
})
export class RestaurantModule {}
