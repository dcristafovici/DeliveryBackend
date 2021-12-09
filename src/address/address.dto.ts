import { Field, InputType, ObjectType } from '@nestjs/graphql';

export interface DataResultsInterface {
  suggestions: SuggestElementInterface[];
}

export interface SuggestElementInterface {
  value: string;
  unrestricted_value: string;
  data: unknown;
}

@ObjectType()
export class SuggestionDataEntity {
  @Field(() => String, { nullable: true })
  geo_lat: string;

  @Field(() => String, { nullable: true })
  geo_lon: string;

  @Field(() => String, { nullable: true })
  postal_code: string;

  @Field(() => String, { nullable: true })
  country: string;

  @Field(() => String, { nullable: true })
  country_iso_code: string;

  @Field(() => String, { nullable: true })
  region_fias_id: string;

  @Field(() => String, { nullable: true })
  region_kladr_id: string;
}

@ObjectType()
export class SuggestionEntity {
  @Field(() => String)
  readonly value: string;

  @Field(() => String)
  readonly unrestricted_value: string;

  @Field(() => SuggestionDataEntity)
  readonly data: SuggestionDataEntity;
}
