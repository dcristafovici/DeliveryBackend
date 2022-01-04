import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { Repository } from 'typeorm';
import { RestaurantCategory } from './restaurant-category.entity';
import {
  AddRestaurantInput,
  FindBunchInput,
  UpdateRestaurantInput,
} from './restaurant.dto';
import { Restaurant } from './Restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  find(): Promise<Restaurant[]> {
    return this.restaurantRepository
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.media', 'media')
      .getMany();
  }

  findOne(id: string): Promise<Restaurant> {
    return this.restaurantRepository
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.media', 'media')
      .where('restaurant.id = :id', { id })
      .getOne();
  }

  findByKey(data: FindByKeyInput): Promise<Restaurant[]> {
    const { field, value } = data;
    return this.restaurantRepository.find({ where: { [field]: value } });
  }

  create(data: AddRestaurantInput): Promise<Restaurant> {
    return this.restaurantRepository.save(data);
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .delete()
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }

  async update(id: string, data: UpdateRestaurantInput): Promise<Restaurant> {
    const updatedLocalEntity = await this.restaurantRepository.preload({
      id,
      ...data,
    });

    return this.restaurantRepository.save(updatedLocalEntity);
  }
}

@Injectable()
export class RestaurantCategoryService {
  constructor(
    @InjectRepository(RestaurantCategory)
    private restaurantCategoryRepository: Repository<RestaurantCategory>,
  ) {}

  findBunch(data: FindBunchInput): Promise<RestaurantCategory[]> {
    const { restaurant, category } = data;
    return this.restaurantCategoryRepository.find({
      where: { restaurant, category },
    });
  }

  findByKey(data: FindByKeyInput): Promise<RestaurantCategory[]> {
    const { field, value } = data;
    return this.restaurantCategoryRepository.find({
      where: { [field]: value },
    });
  }

  createBunch(data: FindBunchInput): Promise<RestaurantCategory> {
    return this.restaurantCategoryRepository.save(data);
  }
}
