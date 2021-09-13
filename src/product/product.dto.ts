import { InputType, Field } from '@nestjs/graphql';

export interface ProductDTO {
  name: string;
  description: string;
  price: string;
  weight: string;
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
  restaurant: string;
}
