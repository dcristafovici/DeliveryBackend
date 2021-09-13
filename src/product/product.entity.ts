import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
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

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'categoryID' })
  category: Category;
}
