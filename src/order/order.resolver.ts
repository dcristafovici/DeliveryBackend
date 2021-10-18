import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CartService } from 'src/cart/cart.service';
import { AddOrderInput } from './order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
  ) {}

  @Mutation(() => Boolean)
  async CreateOrder(@Args('data') data: AddOrderInput): Promise<boolean> {
    const { cart, id } = await this.orderService.createOrder(data);
    cart.map((item) => (item.orderID = id));
    await this.cartService.createCart(cart);
    return true;
  }
}
