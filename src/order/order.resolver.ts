import { Resolver } from '@nestjs/graphql';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}
}
