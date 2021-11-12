import { InputType, Field, ObjectType } from '@nestjs/graphql';

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

@InputType()
@ObjectType()
export class EditCategoryInput {
  @Field(() => String, { nullable: true })
  readonly name: string;
}
