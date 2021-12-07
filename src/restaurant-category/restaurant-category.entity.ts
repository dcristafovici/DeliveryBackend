import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'RESTAURANT_CATEGORY' })
@ObjectType()
export class RestaurantCategory {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'restaurant' })
  restaurant: Restaurant;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category' })
  category: Category;

  @Field()
  @Column()
  order: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
