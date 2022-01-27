import { Field, ObjectType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderCart } from './OrderCart/order-cart.entity';
import { OrderCustomer } from './OrderCustomer/order-customer.entity';
import { OrderPayment } from './OrderPayment/order-payment.entity';

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
  @ManyToMany(() => OrderCart, (orderCart) => orderCart.orders, {
    cascade: true,
    eager: true,
  })
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

  @Field(() => OrderPayment)
  @ManyToOne(() => OrderPayment, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'orderPayment' })
  orderPayment: OrderPayment;

  @Field()
  @Column()
  day: string;

  @Field()
  @Column()
  time: string;

  @Field()
  @Column()
  total: number;

  @Field()
  @Column()
  @Generated('increment')
  orderNumber: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
