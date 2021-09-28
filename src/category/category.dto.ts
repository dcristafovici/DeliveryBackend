import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class AddCategoryInput {
  @Field()
  readonly name: string;

  @Field()
  readonly slug: string;
}
