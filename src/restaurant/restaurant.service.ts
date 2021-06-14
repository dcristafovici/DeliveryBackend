import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantDTO } from './restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  create(details: RestaurantDTO): Promise<Restaurant> {
    console.log(details);
    return this.restaurantRepository.save(details);
  }

  findOne(id: string): Promise<Restaurant> {
    return this.restaurantRepository.findOne(id);
  }

  findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }
}
