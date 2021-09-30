import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class AddCodeInput {
  @Field()
  readonly phone: string;

  @Field()
  readonly code: number;
}
