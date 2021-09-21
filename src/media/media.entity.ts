import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Media {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  path: string;

  @Field()
  @Column()
  small: string;

  @Field()
  @Column()
  medium: string;

  @Field()
  @Column()
  medium_large: string;

  @Field()
  @Column()
  large: string;
}
