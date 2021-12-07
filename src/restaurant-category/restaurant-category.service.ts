import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { Repository } from 'typeorm';
import {
  AddRestaurantCategoryInput,
  FindByGroupKeysInput,
} from './restaurant-category.dto';
import { RestaurantCategory } from './restaurant-category.entity';

@Injectable()
export class RestaurantCategoryService {
  constructor(
    @InjectRepository(RestaurantCategory)
    private restaurantCategoryRepository: Repository<RestaurantCategory>,
  ) {}

  find(): Promise<RestaurantCategory[]> {
    return this.restaurantCategoryRepository
      .createQueryBuilder('RESTAURANT_CATEGORY')
      .getMany();
  }

  findOne(id: string): Promise<RestaurantCategory> {
    return this.restaurantCategoryRepository
      .createQueryBuilder('RESTAURANT_CATEGORY')
      .where('RESTAURANT_CATEGORY.id = :id', { id })
      .getOne();
  }

  findByKey(data: FindByKeyInput): Promise<RestaurantCategory[]> {
    const { field, value } = data;
    return this.restaurantCategoryRepository.find({
      where: { [field]: value },
    });
  }

  findByGroupKeys(data: FindByGroupKeysInput): Promise<RestaurantCategory[]> {
    const { restaurant, category } = data;
    return this.restaurantCategoryRepository.find({
      where: { restaurant, category },
    });
  }

  create(data: AddRestaurantCategoryInput): Promise<RestaurantCategory> {
    return this.restaurantCategoryRepository.save(data);
  }
}
