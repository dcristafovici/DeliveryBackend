import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CheckOtpInput, TokenResponse } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => String)
  authenticationUser(@Args('data') data: CheckOtpInput): Promise<string> {
    return this.userService.authentication(data);
  }

  @Query(() => User)
  getUserByToken(@Args('token') token: string): Promise<User> {
    return this.userService.getUserByToken(token);
  }
}
