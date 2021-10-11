import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/product/product.entity';
import { Restaurant } from 'src/restaurant/restaurant.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinTable,
} from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  tower: string;

  @Field()
  @Column()
  floor: string;

  @Field()
  @Column()
  office: string;

  @Field()
  @Column()
  apartment: string;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  time: string;

  @Field()
  @Column()
  additional: string;

  @Field()
  @Column()
  totalPrice: string;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, { eager: true })
  @JoinColumn({ name: 'restaurant' })
  restaurant: Restaurant;

  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user' })
  user: User;

  @Field(() => [Product])
  @ManyToMany(() => Product, (product) => product.orders, { lazy: true })
  @JoinTable({
    name: 'cart',
    joinColumn: {
      name: 'orderID',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productID',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
