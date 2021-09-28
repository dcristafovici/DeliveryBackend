import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  slug: string;
}
