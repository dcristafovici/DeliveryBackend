import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';

@InputType()
@ObjectType()
export class AddRestaurantCategoryInput {
  @Field(() => String)
  readonly category: Category;

  @Field(() => String)
  readonly restaurnat: Restaurant;

  @Field(() => String)
  readonly order: number;
}

@InputType()
@ObjectType()
export class FindByGroupKeysInput {
  @Field(() => String)
  readonly restaurant: Restaurant;

  @Field(() => String)
  readonly category: Category;
}
