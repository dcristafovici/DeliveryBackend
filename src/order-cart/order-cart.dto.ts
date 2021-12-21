import { Field, InputType } from '@nestjs/graphql';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';

@InputType()
export class AddOrderCartInput {
  @Field(() => String)
  readonly order: Order;

  @Field(() => String)
  readonly product: Product;

  @Field(() => Number)
  readonly quantity: number;
}
