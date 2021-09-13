import { InputType, Field } from '@nestjs/graphql';

export interface CategoryDTO {
  name: string;
}

@InputType()
export class AddCategoryInput {
  @Field()
  name: string;
}
