import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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

  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user' })
  user: User;
}
