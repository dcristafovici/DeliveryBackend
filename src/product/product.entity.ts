import { ObjectType, Field } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurant/restaurant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: string;

  @Field()
  @Column()
  weight: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  @JoinColumn({ name: 'restaurantID' })
  restaurant: Restaurant;
}
