import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { Repository } from 'typeorm';
import { AddRestaurantInput, UpdateRestaurantInput } from './restaurant.dto';
import { Restaurant } from './Restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  find(): Promise<Restaurant[]> {
    return this.restaurantRepository.createQueryBuilder('restaurant').getMany();
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

  async update(id: string, data: UpdateRestaurantInput): Promise<boolean> {
    const { affected } = await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .update()
      .set({ ...data })
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }
}
