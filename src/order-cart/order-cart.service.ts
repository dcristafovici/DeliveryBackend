import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddOrderCartInput } from './order-cart.dto';
import { OrderCart } from './order-cart.entity';

@Injectable()
export class OrderCartService {
  constructor(
    @InjectRepository(OrderCart)
    private orderCartRepository: Repository<OrderCart>,
  ) {}

  create(data: AddOrderCartInput): Promise<OrderCart> {
    return this.orderCartRepository.save(data);
  }
}
