import { Field, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import { User } from 'src/user/user.entity';
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
import { OrderCart } from './order-cart.entity';
import { OrderCustomer } from './order-customer.entity';

@Entity({ name: 'ORDER' })
@ObjectType()
export class Order {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'restaurant' })
  restaurant: Restaurant;

  @Field(() => User)
  @ManyToOne(() => User, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user' })
  user: User;

  @Field(() => [OrderCart])
  @ManyToMany(() => OrderCart, (orderCart) => orderCart.order, { lazy: true })
  @JoinTable({
    name: 'ORDER_RELATION_ORDERCART',
    joinColumn: {
      name: 'orderID',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderCartID',
      referencedColumnName: 'id',
    },
  })
  orderCart: OrderCart[];

  @Field(() => OrderCustomer)
  @ManyToOne(() => OrderCustomer, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'orderCustomer' })
  orderCustomer: OrderCustomer;

  @Field()
  @Column()
  day: string;

  @Field()
  @Column()
  time: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
