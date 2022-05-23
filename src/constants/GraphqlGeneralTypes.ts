import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class GraphqlRelayParams {
  @Field(() => Int, { nullable: true })
  readonly first: number;

  @Field(() => String, { nullable: true })
  readonly after: string;
}

@InputType()
@ObjectType()
export class GraphQLGeneralRequest {
  @Field(() => Int, { nullable: true })
  readonly page: number;

  @Field(() => Int, { nullable: true })
  readonly pageSize: number;
}
