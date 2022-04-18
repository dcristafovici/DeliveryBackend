import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class GraphqlRequestParams {
  @Field(() => Int)
  readonly limit: number;

  @Field(() => Int)
  readonly offset: number;
}

export const getGeneralResponse = (items: any, totalItems: number) => ({
  items,
  totalItems,
});
