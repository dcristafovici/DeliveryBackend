import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddCategoryInput,
  FindByKeyInput,
  UpdateCategoryInput,
} from 'src/category/category.dto';
import { CategoryService } from 'src/category/category.service';
import { RestaurantCategoryService } from 'src/restaurant-category/restaurant-category.service';
import { Repository } from 'typeorm';
import { AddProductInput } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
    private restaurantCategoryService: RestaurantCategoryService,
  ) {}

  find(): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.restaurant', 'restaurant')
      .leftJoinAndSelect('product.media', 'media')
      .leftJoinAndSelect('product.categories', 'category')
      .getMany();
  }

  findOne(id: string): Promise<Product> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.restaurant', 'restaurant')
      .leftJoinAndSelect('product.media', 'media')
      .where('product.id = :id', { id })
      .getOne();
  }

  findByKey(data: FindByKeyInput): Promise<Product[]> {
    const { field, value } = data;
    return this.productRepository.find({ where: { [field]: value } });
  }

  async create(data: AddProductInput): Promise<Product> {
    const { categories, restaurant, ...info } = data;

    const newProduct = new Product();
    Object.assign(newProduct, info);

    const findedInDataCategories = await this.categoryService.findInData(
      categories,
    );
    newProduct.categories = findedInDataCategories;
    newProduct.restaurant = restaurant;

    const createdProduct = await this.productRepository.save(newProduct);

    // Add Restaurant Category
    categories.forEach(async (category: UpdateCategoryInput) => {
      // const alreadyExistingRelation =
      //   // this.restaurantCategoryService.findByGroupKeys({
      //   //   restaurant,
      //   //   category,
      //   // });
      // console.log(alreadyExistingRelation);
    });

    // End Add Restaurant Category

    return createdProduct;
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.productRepository
      .createQueryBuilder('product')
      .delete()
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }
}
