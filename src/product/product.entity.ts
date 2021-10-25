import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/category/category.entity';
import { Media } from 'src/media/media.entity';
import { Restaurant } from 'src/restaurant/restaurant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
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

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'restaurant' })
  restaurant: Restaurant;

  @Field(() => Media)
  @ManyToOne(() => Media, { eager: true })
  @JoinColumn({ name: 'image' })
  image: Media;

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.products, { lazy: true })
  @JoinTable({
    name: 'cat_prod',
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
}
