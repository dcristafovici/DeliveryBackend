import { InputType, Field } from '@nestjs/graphql';

export interface RestaurantDTO {
  name: string;
  description: string;
  minPrice: string;
  deliveryTime: string;
  sale: string;
  rating: string;
}

@InputType()
export class AddRestaurantInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  minPrice: string;

  @Field()
  deliveryTime: string;

  @Field()
  sale: string;

  @Field()
  rating: string;
}
