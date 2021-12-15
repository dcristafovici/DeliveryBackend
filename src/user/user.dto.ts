import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
  @Field(() => String)
  readonly id: string;

  @Field(() => String)
  readonly phone: string;

  @Field(() => String)
  readonly iat: string;
}
