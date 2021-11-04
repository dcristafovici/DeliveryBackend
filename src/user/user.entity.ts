import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column({ nullable: true })
  @IsEmail({}, { message: 'Email should be type email' })
  @IsOptional()
  email: string;

  @Field()
  @Column({ nullable: true })
  tower: string;

  @Field()
  @Column({ nullable: true })
  floor: string;

  @Field()
  @Column({ nullable: true })
  office: string;

  @Field()
  @Column({ nullable: true })
  apartment: string;

  @Field()
  @Column({ nullable: true })
  token: string;

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
