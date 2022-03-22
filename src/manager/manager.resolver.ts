import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { FindByKeyInput } from 'src/category/category.dto';
import { AuthManagerInput } from './manager.dto';
import { Manager } from './manager.entity';
import { ManagerService } from './manager.service';

@Resolver()
export class ManagerResolver {
  constructor(private managerService: ManagerService) {}

  @Query(() => [Manager])
  async findManagers(): Promise<Manager[]> {
    return this.managerService.find();
  }

  @Query(() => [Manager])
  async findByKeyManagers(
    @Args('data') data: FindByKeyInput,
  ): Promise<Manager[]> {
    return this.managerService.findByField(data);
  }

  @Query(() => Manager)
  getManagerByToken(@Args('token') token: string): Promise<Manager> {
    return this.managerService.getManagerByToken(token);
  }

  @Query(() => [Manager])
  findOnlyManagers(): Promise<Manager[]> {
    return this.managerService.findOnlyManagers();
  }

  @Mutation(() => String)
  loginManager(@Args('data') data: AuthManagerInput): Promise<string> {
    return this.managerService.login(data);
  }

  @Mutation(() => Manager)
  createManager(@Args('data') data: AuthManagerInput): Promise<Manager> {
    return this.managerService.create(data);
  }
}
