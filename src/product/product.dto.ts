import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
import { Media } from 'src/media/media.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';

@InputType()
@ObjectType()
export class AddProductInput {
  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly price: number;

  @Field(() => String)
  readonly weight: string;

  @Field(() => String)
  readonly restaurant: Restaurant;

  @Field(() => String)
  readonly media: Media;

  @Field(() => [String])
  readonly categories: Category[];
}
