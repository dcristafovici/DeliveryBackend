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
