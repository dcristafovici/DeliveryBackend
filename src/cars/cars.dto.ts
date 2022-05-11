import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class AddCarsInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  enginePower: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  manufacturer: string;

  @Field(() => Number)
  yearOfProduction: number;

  @Field(() => Boolean, { nullable: true })
  isNew: boolean;
}

@InputType()
@ObjectType()
export class UpdateCarsInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  enginePower: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => String, { nullable: true })
  manufacturer: string;

  @Field(() => Number, { nullable: true })
  yearOfProduction: number;

  @Field(() => Boolean, { nullable: true })
  isNew: boolean;
}
