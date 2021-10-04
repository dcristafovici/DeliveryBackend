import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { JwtPayload } from 'jsonwebtoken';

@InputType()
@ObjectType()
export class AddUserInput {
  @Field()
  readonly phone: string;
}
