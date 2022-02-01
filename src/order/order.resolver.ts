import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindByKeyInput } from 'src/category/category.dto';
import { AddOrderInput, OrderResponse } from './order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [Order])
  async findOrders(): Promise<Order[]> {
    return this.orderService.find();
  }
  @Query(() => Order)
  async findOneOrder(@Args('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Query(() => [Order])
  async findByKeyOrders(@Args('data') data: FindByKeyInput): Promise<Order[]> {
    return this.orderService.findByKey(data);
  }

  @Mutation(() => Order)
  async createOrder(@Args('data') data: AddOrderInput): Promise<Order> {
    return this.orderService.create(data);
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args('id') id: string): Promise<boolean> {
    return this.orderService.delete(id);
  }
}
