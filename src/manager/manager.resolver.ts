import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddManagerInput } from './manager.dto';
import { Manager } from './manager.entity';
import { ManagerService } from './manager.service';

@Resolver()
export class ManagerResolver {
  constructor(private managerService: ManagerService) {}

  @Query(() => [Manager])
  async findManagers(): Promise<Manager[]> {
    return this.managerService.find();
  }
  @Mutation(() => Manager)
  createManager(@Args('data') data: AddManagerInput): Promise<Manager> {
    return this.managerService.create(data);
  }
}
