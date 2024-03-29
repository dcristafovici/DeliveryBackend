import { Field, ObjectType } from '@nestjs/graphql';
import { Media } from 'src/media/media.entity';
import { Restaurant } from 'src/restaurant/Restaurant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ManagerRolesEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

@Entity({ name: 'MANAGER' })
@ObjectType()
export class Manager {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  login: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field(() => Restaurant, { nullable: true })
  @ManyToOne(() => Restaurant, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'restaurant' })
  restaurant: Restaurant;

  @Field()
  @Column({
    type: 'enum',
    enum: ManagerRolesEnum,
    default: ManagerRolesEnum.MANAGER,
  })
  role: ManagerRolesEnum;

  @Field(() => Media, { nullable: true })
  @ManyToOne(() => Media, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'media' })
  media: Media;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
