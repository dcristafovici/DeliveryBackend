import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Media } from 'src/media/media.entity';

@InputType()
@ObjectType()
export class AddRestaurantInput {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly minPrice: string;

  @Field()
  readonly deliveryTime: string;

  @Field()
  readonly discount: string;

  @Field()
  readonly rating: string;

  @Field(() => String)
  readonly image: Media;
}

@InputType()
@ObjectType()
export class EditRestaurantInput {
  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field(() => String, { nullable: true })
  readonly description: string;

  @Field(() => String, { nullable: true })
  readonly minPrice: string;

  @Field(() => String, { nullable: true })
  readonly deliveryTime: string;

  @Field(() => String, { nullable: true })
  readonly discount: string;

  @Field(() => String, { nullable: true })
  readonly rating: string;

  @Field(() => String, { nullable: true })
  readonly image: Media;
}
