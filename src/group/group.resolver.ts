import { Resolver, Query, Args } from '@nestjs/graphql';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private groupService: GroupService) {}

  @Query(() => Group, { name: 'author' })
  async group(@Args('id') id: string) {
    return this.groupService.findOne(id);
  }
}
