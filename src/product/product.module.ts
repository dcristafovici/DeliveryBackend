import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductResolver } from './product.resolver';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { Category } from 'src/category/category.entity';
import { CategoryRestaurant } from 'src/category/categoryRestaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, CategoryRestaurant])],
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
