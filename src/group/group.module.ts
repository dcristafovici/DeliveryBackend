import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupResolver, GroupService],
  exports: [GroupService],
})
export class GroupModule {}
