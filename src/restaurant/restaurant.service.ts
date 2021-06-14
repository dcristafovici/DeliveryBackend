import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  findOne(id: string): Promise<Restaurant> {
    return this.restaurantRepository.findOne(id);
  }
  create(newCategory) {
    this.restaurantRepository.insert(newCategory);
  }

  update(categoryUpdate) {
    this.restaurantRepository.update(categoryUpdate.id, categoryUpdate);
  }

  delete(id: string) {
    this.restaurantRepository.delete(id);
  }
}
