import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddCategoryInput {
  @Field()
  readonly name: string;

  @Field()
  readonly slug: string;
}
