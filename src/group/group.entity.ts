import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
@ObjectType()
@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Field()
  name: number;
  @Field()
  description: number;
}
