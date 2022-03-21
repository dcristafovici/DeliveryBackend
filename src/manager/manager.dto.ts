import { Field, InputType, ObjectType } from '@nestjs/graphql';

export enum ManagerRolesEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANGER',
}

@InputType()
@ObjectType()
export class AddManagerInput {
  @Field(() => String)
  readonly login: string;

  @Field(() => String)
  readonly password: string;
}
