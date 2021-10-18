import { InputType, Field } from '@nestjs/graphql';
import { AddProductInput } from 'src/product/product.dto';
import { Product } from 'src/product/product.entity';
import { Restaurant } from 'src/restaurant/restaurant.entity';
import { User } from 'src/user/user.entity';

@InputType()
class AddcCartInput {
  @Field()
  readonly productID: number;

  @Field()
  readonly quantity: number;
}
@InputType()
export class AddOrderInput {
  @Field()
  readonly name: string;

  @Field()
  readonly phone: string;

  @Field()
  readonly tower: string;

  @Field()
  readonly floor: string;

  @Field()
  readonly office: string;

  @Field()
  readonly apartment: string;

  @Field()
  readonly date: string;

  @Field()
  readonly time: string;

  @Field()
  readonly additional: string;

  @Field()
  readonly totalPrice: string;

  @Field(() => String)
  readonly restaurant: Restaurant;

  @Field(() => String)
  readonly user: User;

  @Field(() => [AddcCartInput])
  readonly cart: Product[];
}
