import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AddUserInput, UpdateUserInput } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async CheckToken(@Args('token') token: string): Promise<User> {
    return await this.userService.checkToken(token);
  }

  @Query(() => [User])
  async Users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async AddUser(@Args('data') data: AddUserInput): Promise<any> {
    return await this.userService.create(data);
  }

  @Mutation(() => Boolean)
  async updateUser(@Args('data') data: UpdateUserInput): Promise<boolean> {
    await this.userService.updateUser(data);
    return true;
  }
}
