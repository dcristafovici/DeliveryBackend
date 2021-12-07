import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  slug: string;

  @ManyToMany(() => Product, (product) => product.categories, {
    lazy: true,
  })
  @Field(() => [Product])
  products: Promise<Product[]>;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
