import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddOrderInput } from './order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
  ) {}

  async createOrder(data: AddOrderInput): Promise<any> {
    const { cart, ...order } = data;
    const { id } = await this.OrderRepository.save(order);
    return { cart, id };
  }
}
