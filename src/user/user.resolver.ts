import { Args, Resolver, Query } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  getUserByToken(@Args('token') token: string): Promise<User> {
    return this.userService.getUserByToken(token);
  }
}
