import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private groupService: GroupService) {}

  @Query(() => Group)
  async groupOne(@Args('id') id: string): Promise<Group> {
    return await this.groupService.findOne(id);
  }
  @Query(() => [Group])
  async allGroups(): Promise<Group[]> {
    return await this.groupService.findAll();
  }

  @Mutation(() => Group)
  async createGroup(
    @Args('name') name: string,
    @Args('description') description: string,
  ): Promise<Group> {
    return await this.groupService.create({ name, description });
  }
}
