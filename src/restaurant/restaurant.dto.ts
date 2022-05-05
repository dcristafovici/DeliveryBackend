import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
import { Media } from 'src/media/media.entity';
import { Restaurant } from './Restaurant.entity';
import { Connection } from '../GraphQL/Connection';

@ObjectType()
export class RestaurantConnection extends Connection<Restaurant>(Restaurant) {}

@InputType()
@ObjectType()
export class AddRestaurantInput {
  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly description: string;

  @Field(() => String)
  readonly minPrice: number;

  @Field(() => String)
  readonly deliveryTime: string;

  @Field(() => String)
  readonly rating: string;

  @Field(() => String)
  readonly media: Media;
}

@InputType()
@ObjectType()
export class UpdateRestaurantInput {
  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field(() => String, { nullable: true })
  readonly description: string;

  @Field(() => String, { nullable: true })
  readonly minPrice: number;

  @Field(() => String, { nullable: true })
  readonly deliveryTime: string;

  @Field(() => String, { nullable: true })
  readonly rating: string;

  @Field(() => String, { nullable: true })
  readonly media: Media;
}

@InputType()
@ObjectType()
export class FindBunchInput {
  @Field(() => String)
  readonly restaurant: Restaurant;

  @Field(() => String)
  readonly category: Category;
}

@InputType()
@ObjectType()
export class UpdateBunchInput {
  @Field(() => [OneBunchInput])
  readonly bunch: OneBunchInput[];
}

@InputType()
export class OneBunchInput {
  @Field(() => String)
  readonly id: string;

  @Field(() => Number)
  readonly order: number;
}
