import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class AddOtpInput {
  @Field(() => String)
  readonly phone: string;

  @Field(() => String)
  readonly sessionID: string;
}
