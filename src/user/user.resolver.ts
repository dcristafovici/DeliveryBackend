import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UpdateUserInput } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  getUserByToken(@Args('token') token: string): Promise<User> {
    return this.userService.getUserByToken(token);
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<boolean> {
    return this.userService.update(id, data);
  }
}
