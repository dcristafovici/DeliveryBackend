import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import { User } from 'src/user/user.entity';

@InputType()
@ObjectType()
export class AddOrderInput {
  @Field(() => String)
  readonly day: string;

  @Field(() => String)
  readonly time: string;

  @Field(() => String)
  readonly status: string;

  @Field(() => String)
  readonly comment: string;

  @Field(() => String)
  readonly restaurant: Restaurant;

  @Field(() => String)
  readonly user: User;

  // @Field(() => [AddOrderCartInput])
  // readonly orderCart: AddOrderCartInput[];
}
