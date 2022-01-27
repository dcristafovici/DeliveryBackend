import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddOrderCustomerInput } from './order-customer.dto';
import { OrderCustomer } from './order-customer.entity';

@Injectable()
export class OrderCustomerService {
  constructor(
    @InjectRepository(OrderCustomer)
    private orderCustomerRepository: Repository<OrderCustomer>,
  ) {}

  create(data: AddOrderCustomerInput): Promise<OrderCustomer> {
    return this.orderCustomerRepository.save(data);
  }
}
