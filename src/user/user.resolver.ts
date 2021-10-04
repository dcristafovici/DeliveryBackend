import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AddUserInput } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async CheckToken(@Args('token') token: string): Promise<User> {
    return await this.userService.checkToken(token);
  }

  @Mutation(() => User)
  async AddUser(@Args('data') data: AddUserInput): Promise<any> {
    return await this.userService.create(data);
  }
}
