import { Field, InputType } from '@nestjs/graphql';
import { Product } from 'src/product/product.entity';

@InputType()
export class AddOrderCartInput {
  @Field(() => String)
  readonly product: Product;

  @Field(() => String)
  readonly productName: string;

  @Field(() => Number)
  readonly quantity: number;
}
