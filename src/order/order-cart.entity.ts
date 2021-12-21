import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/product.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'ORDER_CART' })
@ObjectType()
export class OrderCart {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Order)
  @ManyToOne(() => Order, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'order' })
  order: Order;

  @Field(() => Product)
  @ManyToOne(() => Product, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToMany(() => Order, (order) => order.orderCart, {
    lazy: true,
  })
  @Field(() => [Order])
  orders: Promise<Order[]>;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
