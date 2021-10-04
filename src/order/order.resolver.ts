import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AddOrderInput } from './order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => Order)
  async AddOrder(@Args('data') data: AddOrderInput) {
    return await this.orderService.create(data);
  }
}
