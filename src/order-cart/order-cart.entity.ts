import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ORDER_CART' })
@ObjectType()
export class OrderCart {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Order, { nullable: true })
  @ManyToOne(() => Order, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'order' })
  order: Order;

  @Field(() => Product, { nullable: true })
  @ManyToOne(() => Product, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'product' })
  product: Product;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
