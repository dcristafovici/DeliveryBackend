import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Media } from 'src/media/media.entity';

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
  readonly image: Media;
}
