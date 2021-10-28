import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryResolver,
  CategoryRestaurantResolver,
} from './category.resolver';
import { Category } from './category.entity';
import { CategoryRestaurantService, CategoryService } from './category.service';
import { CategoryRestaurant } from './categoryRestaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryRestaurant])],
  providers: [
    CategoryResolver,
    CategoryService,
    CategoryRestaurantResolver,
    CategoryRestaurantService,
  ],
  exports: [CategoryService, CategoryRestaurantService],
})
export class CategoryModule {}
