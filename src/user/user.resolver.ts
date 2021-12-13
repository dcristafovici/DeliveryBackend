import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CheckOtpInput } from './user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => String)
  authenticationUser(@Args('data') data: CheckOtpInput): Promise<string> {
    return this.userService.authentication(data);
  }
}
