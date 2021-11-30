import { Field, InputType } from '@nestjs/graphql';

export interface MediaDTO {
  name: string;
  path: string;
  map: any;
}

@InputType()
export class AddMediaInput {
  @Field()
  name: string;

  @Field()
  path: string;
}

export const MediaSizes = [
  {
    path: 'small',
    x: 150,
  },
  {
    path: 'medium',
    x: 300,
  },
  {
    path: 'mediumLarge',
    x: 760,
  },
  {
    path: 'large',
    x: 1200,
  },
];
