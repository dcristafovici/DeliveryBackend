import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Media } from 'src/media/media.entity';

@InputType()
@ObjectType()
export class AddRestaurantInput {
  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly desription: string;

  @Field(() => String)
  readonly minPrice: number;

  @Field(() => String)
  readonly deliveryTime: string;

  @Field(() => Number)
  readonly rating: number;

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
  readonly discount: string;

  @Field(() => Number, { nullable: true })
  readonly rating: number;

  @Field(() => String, { nullable: true })
  readonly image: Media;
}
