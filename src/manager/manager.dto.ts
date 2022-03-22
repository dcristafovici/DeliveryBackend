import { Field, InputType, ObjectType } from '@nestjs/graphql';

export enum ManagerRolesEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

@InputType()
@ObjectType()
export class AuthManagerInput {
  @Field(() => String)
  readonly login: string;

  @Field(() => String)
  readonly password: string;
}
