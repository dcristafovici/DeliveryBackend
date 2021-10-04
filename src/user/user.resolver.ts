import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AddUserInput } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => Boolean)
  async AddUser(@Args('data') data: AddUserInput): Promise<boolean> {
    return await this.userService.create(data);
  }
}
