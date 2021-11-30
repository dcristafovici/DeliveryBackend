import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class AddCategoryInput {
  @Field(() => String)
  readonly name: string;
}

@InputType()
@ObjectType()
export class FindByKeyInput {
  @Field(() => String)
  readonly field: string;

  @Field(() => String)
  readonly value: string;
}

@InputType()
@ObjectType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field(() => String, { nullable: true })
  readonly slug: string;
}
