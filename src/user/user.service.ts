import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AddUserInput } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async create(data: AddUserInput): Promise<boolean> {
    const { phone } = data;
    const user = await this.UserRepository.findOne({ phone });
    !user && (await this.UserRepository.save(data));
    return true;
  }
}
