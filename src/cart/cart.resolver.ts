import { Resolver } from '@nestjs/graphql';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private cartService: CartService) {}
}
