import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Manager } from './manager.entity';
import { Media } from 'src/media/media.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import { ListConnection as Connection } from 'src/GraphQL/ListConnection';

@ObjectType()
export class ManagerListConnection extends Connection<Manager>(Manager) {}

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
