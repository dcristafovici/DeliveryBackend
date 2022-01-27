import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import { User } from 'src/user/user.entity';
import { AddOrderCartInput } from './OrderCart/order-cart.dto';
import { AddOrderCustomerInput } from './OrderCustomer/order-customer.dto';

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
