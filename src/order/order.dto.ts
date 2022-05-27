import { Field, Int, InputType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import { User } from 'src/user/user.entity';
import { Order } from './order.entity';
import { AddOrderCartInput } from './OrderCart/order-cart.dto';
import { AddOrderCustomerInput } from './OrderCustomer/order-customer.dto';
import { ListConnection as Connection } from 'src/GraphQL/ListConnection';

@ObjectType()
export class OrderListConnection extends Connection<Order>(Order) {}

@InputType()
@ObjectType()
export class AddOrderInput {
  @Field(() => String)
  readonly date: string;

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

@InputType()
export class OrderResponse {
  @Field(() => String)
  readonly name: string;

  @Field(() => Number)
  readonly orderNumber: number;

  @Field(() => String)
  readonly confirmation_url: string;
}
