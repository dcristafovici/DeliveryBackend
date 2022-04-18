import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Media } from 'src/media/media.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';

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

@InputType()
@ObjectType()
export class UpdateManagerInput {
  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field(() => String, { nullable: true })
  readonly phone: string;

  @Field(() => String, { nullable: true })
  readonly email: string;

  @Field(() => String, { nullable: true })
  readonly restaurant: Restaurant;

  @Field(() => String, { nullable: true })
  readonly media: Media;
}
