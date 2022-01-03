import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { CategoryService } from 'src/category/category.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { AddProductInput, UpdateProductInput } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
    private restaurantCategoryService: RestaurantService,
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
    categories.forEach(async (category: any) => {
      if (typeof restaurant !== 'string') return false;
      const findedBunch =
        await this.restaurantCategoryService.findBunchCategoryRestaurant(
          restaurant,
          category,
        );
      if (!findedBunch.length) {
        await this.restaurantCategoryService.createBunchCategoryRestaurant(
          restaurant,
          category,
        );
      }
    });

    const createdProduct = await this.productRepository.save(newProduct);

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

  async update(id: string, data: UpdateProductInput): Promise<boolean> {
    const { affected } = await this.productRepository
      .createQueryBuilder('category')
      .update(Product)
      .set({ ...data })
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }
}
