import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class GeneralGettingOptions {
  @Field(() => Number)
  readonly limit: number;

  @Field(() => Number)
  readonly offset: number;
}
