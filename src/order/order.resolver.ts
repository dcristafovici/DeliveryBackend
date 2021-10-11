import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddOrderInput } from './order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [Order])
  async GetOrdersByUser(@Args('user') user: string) {
    return await this.orderService.getOrderByUser(user);
  }

  @Mutation(() => Order)
  async CreateOrder(@Args('data') data: AddOrderInput) {
    return await this.orderService.create(data);
  }
}
