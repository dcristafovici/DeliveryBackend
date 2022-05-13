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

export interface PositionResultsInterface {
  data: PositionElementInterface[];
}

export interface PositionElementInterface {
  latitude: number;
  longitude: number;
  type: string;
  name: string;
  postal_code: string;
  street: string;
  confidence: number;
  region: string;
  region_code: string;
  country: string;
  locality: string;
  administrative_area: string;
  neighbourhood: string;
  country_code: string;
  continent: string;
  label: string;
}

@ObjectType()
export class PositionEntity {
  @Field(() => Number, { nullable: true })
  readonly latitude: number;

  @Field(() => Number, { nullable: true })
  readonly longitude: number;

  @Field(() => String, { nullable: true })
  readonly type: string;

  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field(() => Number, { nullable: true })
  readonly number: number;

  @Field(() => String, { nullable: true })
  readonly postal_code: string;

  @Field(() => String, { nullable: true })
  readonly street: string;

  @Field(() => Number, { nullable: true })
  readonly confidence: number;

  @Field(() => String, { nullable: true })
  readonly region: string;

  @Field(() => String, { nullable: true })
  readonly region_code: string;

  @Field(() => String, { nullable: true })
  readonly county: string;

  @Field(() => String, { nullable: true })
  readonly locality: string;

  @Field(() => String, { nullable: true })
  readonly administrative_area: string;

  @Field(() => String, { nullable: true })
  readonly neighbourhood: string;

  @Field(() => String, { nullable: true })
  readonly country_code: string;

  @Field(() => String, { nullable: true })
  readonly continent: string;

  @Field(() => String, { nullable: true })
  readonly label: string;
}
