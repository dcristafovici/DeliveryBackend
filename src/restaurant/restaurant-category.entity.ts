import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from './Restaurant.entity';

@Entity()
@ObjectType()
export class RestaurantCategory {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Category)
  @ManyToOne(() => Category, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category' })
  category: Category;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'restaurant' })
  restaurant: Restaurant;

  @Field()
  @Column()
  @Generated('increment')
  order: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
