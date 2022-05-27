import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ListConnection as Connection } from 'src/GraphQL/ListConnection';
import { User } from './user.entity';

@ObjectType()
export class UserListConnection extends Connection<User>(User) {}

@ObjectType()
export class TokenResponse {
  @Field(() => String)
  readonly id: string;

  @Field(() => String)
  readonly phone: string;

  @Field(() => String)
  readonly iat: string;
}

@InputType()
@ObjectType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field(() => String, { nullable: true })
  readonly phone: string;

  @Field(() => String, { nullable: true })
  readonly email: string;

  @Field(() => String, { nullable: true })
  readonly address: string;

  @Field(() => String, { nullable: true })
  readonly address_lat: string;

  @Field(() => String, { nullable: true })
  readonly address_lon: string;
}

@InputType()
@ObjectType()
export class AuthenticationInput {
  @Field(() => String)
  readonly phone: string;

  @Field(() => String)
  readonly code: string;

  @Field(() => String)
  readonly sessionID: string;
}
