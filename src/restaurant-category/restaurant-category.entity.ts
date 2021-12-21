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

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, { eager: true, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'restaurant' })
  restaurant: Restaurant;

  @Field(() => Category)
  @ManyToOne(() => Category, { eager: true, onDelete: 'NO ACTION' })
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
