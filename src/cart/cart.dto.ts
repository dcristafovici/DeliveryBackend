import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class AddCartInput {
  @Field()
  readonly orderID: string;

  @Field()
  readonly productID: string;

  @Field()
  readonly quantity: number;
}
