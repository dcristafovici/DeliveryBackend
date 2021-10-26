import { ObjectType, Field } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurant/restaurant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Generated,
} from 'typeorm';
import { Category } from './category.entity';

@ObjectType()
@Entity()
export class CategoryRestaurant {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'restaurant' })
  restaurant: Restaurant;

  @Field(() => Category)
  @ManyToOne(() => Category, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category' })
  category: Category;

  @Field()
  @Column()
  @Generated('increment')
  order: number;
}
