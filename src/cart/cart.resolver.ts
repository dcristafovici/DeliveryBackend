import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AddCartInput } from './cart.dto';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Mutation(() => [Cart])
  async AddCartItem(@Args('data') data: AddCartInput) {
    return await this.cartService.createCart(data);
  }

  @Query(() => [Cart])
  async GetCart(@Args('orderID') orderID: string) {
    return await this.cartService.getCart(orderID);
  }
}
