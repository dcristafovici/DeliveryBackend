import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddCategoryInput {
  @Field()
  readonly name: string;
}

@InputType()
export class FindByKeyInput {
  @Field()
  readonly field: string;

  @Field()
  readonly value: string;
}