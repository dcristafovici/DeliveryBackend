import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupDTO } from './group.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  create(details: GroupDTO): Promise<Group> {
    console.log(details);
    return this.groupRepository.save(details);
  }

  findOne(id: string): Promise<Group> {
    return this.groupRepository.findOne(id);
  }

  findAll(): Promise<Group[]> {
    console.log(this.groupRepository.find());
    return this.groupRepository.find();
  }
}
