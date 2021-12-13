import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class CheckOtpInput {
  @Field(() => String)
  readonly phone: string;

  @Field(() => String)
  readonly OTP: string;

  @Field(() => String)
  readonly sessionID: string;
}
