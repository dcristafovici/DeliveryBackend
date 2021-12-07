import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantCategory } from './restaurant-category.entity';
import { RestaurantCategoryService } from './restaurant-category.service';
import { RestaurantCategoryResolver } from './restaurant-category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantCategory])],
  providers: [RestaurantCategoryService, RestaurantCategoryResolver],
  exports: [RestaurantCategoryService],
})
export class RestaurantCategoryModule {}
