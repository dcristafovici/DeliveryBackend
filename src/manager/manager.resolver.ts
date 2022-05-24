import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { FindByKeyInput } from 'src/category/category.dto';
import { GraphQLGeneralRequest } from 'src/constants/GraphqlGeneralTypes';
import { ListResult } from 'src/constants/TypeormGeneralTypes';
import {
  AuthManagerInput,
  ManagerListConnection,
  UpdateManagerInput,
} from './manager.dto';
import { Manager } from './manager.entity';
import { ManagerService } from './manager.service';

@Resolver()
export class ManagerResolver {
  constructor(private managerService: ManagerService) {}

  @Query(() => [Manager])
  async findManagers(): Promise<Manager[]> {
    return this.managerService.find();
  }

  @Query(() => Manager)
  async findOneManager(@Args('id') id: string): Promise<Manager> {
    return this.managerService.findOne(id);
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

  @Query(() => ManagerListConnection)
  findOnlyManagers(
    @Args('data') data: GraphQLGeneralRequest,
  ): Promise<ListResult<Manager>> {
    return this.managerService.findOnlyManagers(data);
  }

  @Mutation(() => String)
  loginManager(@Args('data') data: AuthManagerInput): Promise<string> {
    return this.managerService.login(data);
  }

  @Mutation(() => Manager)
  createManager(@Args('data') data: AuthManagerInput): Promise<Manager> {
    return this.managerService.create(data);
  }

  @Mutation(() => Boolean)
  async updateManager(
    @Args('id') id: string,
    @Args('data') data: UpdateManagerInput,
  ): Promise<boolean> {
    return this.managerService.update(id, data);
  }
}
