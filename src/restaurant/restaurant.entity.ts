import { Field, ObjectType } from '@nestjs/graphql';
import { Media } from 'src/media/media.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
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
  description: string;

  @Field()
  @Column()
  minPrice: string;

  @Field()
  @Column()
  deliveryTime: string;

  @Field()
  @Column()
  discount: string;

  @Field()
  @Column()
  rating: string;

  @Field((type) => Media, { nullable: true })
  @OneToOne((type) => Media, (media) => media.id)
  image: Media;
}
