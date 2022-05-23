import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Category } from './category.entity';
import { ListConnection as Connection } from 'src/GraphQL/ListConnection';

@ObjectType()
export class CategoryListConnection extends Connection<Category>(Category) {}

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

@InputType()
@ObjectType()
export class FindByResCatCombInput {
  @Field(() => String)
  readonly restaurant: string;

  @Field(() => String)
  readonly category: string;
}
