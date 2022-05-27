import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { GraphQLGeneralRequest } from 'src/constants/GraphqlGeneralTypes';
import { ListResult } from 'src/constants/TypeormGeneralTypes';
import {
  AuthenticationInput,
  UpdateUserInput,
  UserListConnection,
} from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserListConnection)
  findUsers(
    @Args('data') data: GraphQLGeneralRequest,
  ): Promise<ListResult<User>> {
    return this.userService.find(data);
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
