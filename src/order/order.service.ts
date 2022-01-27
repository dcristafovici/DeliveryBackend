import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { Repository } from 'typeorm';
import { AddOrderInput } from './order.dto';
import { Order } from './order.entity';
import { OrderCartService } from './OrderCart/order-cart.service';
import { OrderCustomerService } from './OrderCustomer/order-customer.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderCustomerService: OrderCustomerService,
    private orderCartService: OrderCartService,
  ) {}

  find(): Promise<Order[]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.restaurant', 'restaurant')
      .leftJoinAndSelect('order.user', 'media')
      .leftJoinAndSelect('order.orderCustomer', 'orderCustomer')
      .innerJoinAndSelect('order.orderCart', 'orderCart')
      .leftJoinAndSelect('orderCart.product', 'product')
      .getMany();
  }

  findOne(id: string): Promise<Order> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.restaurant', 'restaurant')
      .leftJoinAndSelect('order.user', 'user')
      .where('order.id = :id', { id })
      .getOne();
  }

  findByKey(data: FindByKeyInput): Promise<Order[]> {
    const { field, value } = data;
    return this.orderRepository.find({ where: { [field]: value } });
  }

  async create(data: AddOrderInput): Promise<Order> {
    const { orderCart, orderCustomer, ...order } = data;
    const orderCustomerCreated = await this.orderCustomerService.create(
      orderCustomer,
    );
    const orderCartCreated = await this.orderCartService.create(orderCart);
    const combinedOrder = {
      ...order,
      orderCustomer: orderCustomerCreated,
      orderCart: orderCartCreated,
    };
    return this.orderRepository.save(combinedOrder);
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.orderRepository
      .createQueryBuilder('order')
      .delete()
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }
}
