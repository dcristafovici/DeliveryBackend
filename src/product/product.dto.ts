import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
import { Media } from 'src/media/media.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import { Product } from './product.entity';
import { ListConnection as Connection } from 'src/GraphQL/ListConnection';

@ObjectType()
export class ProductListConnection extends Connection<Product>(Product) {}

@InputType()
@ObjectType()
export class AddProductInput {
  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly description: string;

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

@InputType()
@ObjectType()
export class UpdateProductInput {
  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field(() => String, { nullable: true })
  readonly description: string;

  @Field(() => String, { nullable: true })
  readonly price: number;

  @Field(() => String, { nullable: true })
  readonly weight: string;

  @Field(() => String, { nullable: true })
  readonly restaurant: Restaurant;

  @Field(() => String, { nullable: true })
  readonly media: Media;

  @Field(() => [String], { nullable: true })
  readonly categories: Category[];
}
