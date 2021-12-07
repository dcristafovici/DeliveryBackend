import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
import { Media } from 'src/media/media.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'PRODUCT' })
@ObjectType()
export class Product {
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
  price: number;

  @Field()
  @Column()
  weight: string;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'restaurant' })
  restaurant: Restaurant;

  @Field(() => Media, { nullable: true })
  @ManyToOne(() => Media, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'media' })
  media: Media;

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.products, { lazy: true })
  @JoinTable({
    name: 'CATEGORY_PRODUCT',
    joinColumn: {
      name: 'productID',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryID',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
