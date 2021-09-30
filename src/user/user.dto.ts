import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class AddUserInput {
  @Field()
  readonly phone: string;
}
