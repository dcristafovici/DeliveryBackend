import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/product.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import { User } from 'src/user/user.entity';
import { Order } from './order.entity';

@InputType()
export class AddOrderCartInput {
  @Field(() => String)
  readonly product: Product;

  @Field(() => Number)
  readonly quantity: number;
}

@InputType()
export class AddOrderCustomerInput {
  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly phone: string;

  @Field(() => String)
  readonly email: string;

  @Field(() => String)
  readonly address: string;

  @Field(() => String)
  readonly floor: string;

  @Field(() => String)
  readonly office: string;

  @Field(() => String)
  readonly apartment: string;

  @Field(() => String)
  readonly additionalComment: string;
}

@InputType()
@ObjectType()
export class AddOrderInput {
  @Field(() => String)
  readonly day: string;

  @Field(() => String)
  readonly time: string;

  @Field(() => String)
  readonly status: string;

  @Field(() => Number)
  readonly total: number;

  @Field(() => String)
  readonly restaurant: Restaurant;

  @Field(() => String)
  readonly user: User;

  @Field(() => [AddOrderCartInput])
  readonly orderCart: AddOrderCartInput[];

  @Field(() => AddOrderCustomerInput)
  readonly orderCustomer: AddOrderCustomerInput;
}
