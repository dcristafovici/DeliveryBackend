import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddRestaurantInput } from './restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private RestaurantRepository: Repository<Restaurant>,
  ) {}

  create(data: AddRestaurantInput): Promise<Restaurant> {
    return this.RestaurantRepository.save(data);
  }

  findOne(id: string): Promise<Restaurant> {
    return this.RestaurantRepository.findOne(id);
  }
  async findAll(): Promise<Restaurant[]> {
    return this.RestaurantRepository.find();
  }
  delete(id: string): Promise<any> {
    return this.RestaurantRepository.delete(id);
  }
}
