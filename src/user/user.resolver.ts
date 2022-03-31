import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { AuthenticationInput, UpdateUserInput } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  findUsers(): Promise<User[]> {
    return this.userService.find();
  }

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

  @Mutation(() => String)
  authenticationUser(@Args('data') data: AuthenticationInput): Promise<string> {
    return this.userService.authentication(data);
  }
}
