import { Field, ObjectType } from '@nestjs/graphql';
import { Media } from 'src/media/media.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'RESTAURANT' })
@ObjectType()
export class Restaurant {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  minPrice: number;

  @Field()
  @Column()
  deliveryTime: string;

  @Field()
  @Column()
  rating: string;

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
