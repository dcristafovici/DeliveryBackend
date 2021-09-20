import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@ObjectType()
@Entity()
export class Restaurant {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  minPrice: string;

  @Field()
  @Column()
  deliveryTime: string;

  @Field()
  @Column()
  sale: string;

  @Field()
  @Column()
  rating: string;
}
