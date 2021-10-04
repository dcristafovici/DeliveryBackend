import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AddUserInput } from './user.dto';
import jwt, { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async create(data: AddUserInput): Promise<any> {
    const { phone } = data;
    const user = await this.UserRepository.findOne({ phone });
    !user && (await this.UserRepository.save(data));
    const token = await jwt.sign({ id: user.id }, 'SECRET');
    return { ...user, token };
  }

  async checkToken(token: string): Promise<User> {
    const verified: any = jwt.verify(token, 'SECRET');
    const User = await this.UserRepository.findOne(verified.id);
    return User;
  }
}
