import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'CARS' })
@ObjectType()
export class Cars {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019',
  })
  image: string;

  @Field()
  @Column()
  enginePower: string;

  @Field()
  @Column()
  manufacturer: string;

  @Field()
  @Column()
  yearOfProduction: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
