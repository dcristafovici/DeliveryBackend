import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/product/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToMany((type) => Product, (product) => product.categories, {
    lazy: true,
  })
  @Field((type) => [Product])
  products: Promise<Product[]>;
}
