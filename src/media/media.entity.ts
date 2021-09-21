import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Media {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  path: string;

  @Field()
  @Column({ nullable: true })
  small: string;

  @Field()
  @Column({ nullable: true })
  medium: string;

  @Field()
  @Column({ nullable: true })
  medium_large: string;

  @Field()
  @Column({ nullable: true })
  large: string;
}
