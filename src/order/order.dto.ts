import { InputType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
@InputType()
export class AddOrderInput {
  @Field()
  readonly name: string;

  @Field()
  readonly phone: string;

  @Field()
  readonly tower: string;

  @Field()
  readonly floor: string;

  @Field()
  readonly office: string;

  @Field()
  readonly apartment: string;

  @Field()
  readonly date: string;

  @Field()
  readonly time: string;

  @Field()
  readonly additional: string;

  @Field(() => String)
  readonly user: User;
}
