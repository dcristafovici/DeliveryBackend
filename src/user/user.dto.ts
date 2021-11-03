import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class AddUserInput {
  @Field()
  readonly phone: string;
}

@InputType()
@ObjectType()
export class UpdateUserInput {
  @Field()
  readonly id: string;

  @Field()
  readonly field: string;

  @Field()
  readonly value: string;
}
