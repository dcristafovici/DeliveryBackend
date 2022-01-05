import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import { Repository } from 'typeorm';
import { OrderCart } from './order-cart.entity';
import { OrderCustomer } from './order-customer.entity';
import { AddOrderInput } from './order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderCart)
    private orderCartRepository: Repository<OrderCart>,
    @InjectRepository(OrderCustomer)
    private orderCustomerRepository: Repository<OrderCustomer>,
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

  async create(data: AddOrderInput): Promise<boolean> {
    const { orderCart, orderCustomer, ...order } = data;
    const orderCustomerCreated = await this.orderCustomerRepository.save(
      orderCustomer,
    );

    const orderCartCreated = await this.orderCartRepository.save(orderCart);

    const combinedOrder = new Order();
    Object.assign(combinedOrder, {
      ...order,
      orderCustomer: orderCustomerCreated,
      orderCart: orderCartCreated,
    });

    return await this.orderRepository
      .save(combinedOrder)
      .then(() => true)
      .catch(() => false);
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
