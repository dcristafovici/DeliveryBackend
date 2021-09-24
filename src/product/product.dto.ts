import { InputType, Field } from '@nestjs/graphql';
import { AddCategoryInput } from 'src/category/category.dto';
import { Category } from 'src/category/category.entity';
import { AddMediaInput } from 'src/media/media.dto';
import { Media } from 'src/media/media.entity';
import { AddRestaurantInput } from 'src/restaurant/restaurant.dto';

export interface ProductDTO {
  name: string;
  description: string;
  price: string;
  weight: string;
  restaurant: string;
  category: string;
  image: string;
}

@InputType()
export class AddProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: string;

  @Field()
  weight: string;

  @Field()
  restaurant: AddRestaurantInput;

  @Field()
  category: AddCategoryInput;

  @Field()
  image: AddMediaInput;
}
