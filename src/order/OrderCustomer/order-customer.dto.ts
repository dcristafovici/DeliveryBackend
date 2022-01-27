import { Field, InputType } from '@nestjs/graphql';

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
