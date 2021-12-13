import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'USER' })
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column({ nullable: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address_lat: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address_long: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
