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

@Entity()
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
  desription: string;

  @Field()
  @Column()
  minPrice: number;

  @Field()
  @Column()
  deliveryTime: string;

  @Field()
  @Column('decimal', { precision: 5, scale: 2 })
  rating: number;

  @Field(() => Media)
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
