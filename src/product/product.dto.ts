import { InputType, Field } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
import { Media } from 'src/media/media.entity';
import { Restaurant } from 'src/restaurant/restaurant.entity';

@InputType()
export class AddProductInput {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly price: number;

  @Field()
  readonly weight: string;

  @Field(() => String)
  readonly restaurant: Restaurant;

  // @Field(() => String)
  // readonly category: Category;

  @Field(() => String)
  readonly image: Media;
}

@InputType()
export class FindByFieldInput {
  @Field()
  readonly field: string;

  @Field()
  readonly value: string;
}
