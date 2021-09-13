import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantDTO } from './restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private RestaurantRepository: Repository<Restaurant>,
  ) {}

  create(data: RestaurantDTO): Promise<Restaurant> {
    return this.RestaurantRepository.save(data);
  }

  findOne(id: string): Promise<Restaurant> {
    return this.RestaurantRepository.findOne(id);
  }
  findAll(): Promise<Restaurant[]> {
    return this.RestaurantRepository.find();
  }
  delete(id: string): Promise<any> {
    return this.RestaurantRepository.delete(id);
  }
}
