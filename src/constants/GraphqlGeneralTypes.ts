import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class GraphqlRelayParams {
  @Field(() => Int, { nullable: true })
  readonly first: number;

  @Field(() => String, { nullable: true })
  readonly after: string;
}
