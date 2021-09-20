import { InputType, Field } from '@nestjs/graphql';

export interface MediaDTO {
  name: string;
  path: string;
}

@InputType()
export class AddMediaInput {
  @Field()
  name: string;

  @Field()
  path: string;
}
