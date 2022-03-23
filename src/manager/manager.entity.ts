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
import { ManagerRolesEnum } from './manager.dto';

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
