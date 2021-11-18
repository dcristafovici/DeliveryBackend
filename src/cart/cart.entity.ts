import { ObjectType, Field } from '@nestjs/graphql';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity()
export class Cart {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Order)
  @ManyToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'orderID' })
  orderID: Order;

  @Field(() => Product)
  @ManyToOne(() => Product, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'productID' })
  productID: Product;

  @Field()
  @Column()
  quantity: number;

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
