import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { verifyAccessToken } from 'src/utils/verifyAccessToken';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByField(key: string, value: string): Promise<User> {
    return this.userRepository.findOne({ [key]: value });
  }

  async register(userPhone: string): Promise<string> {
    return await this.userRepository
      .save({ phone: userPhone })
      .then((res) => {
        const { id } = res;
        return jwt.sign({ id }, process.env.JWT_SECRET);
      })
      .catch((err) => {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: err,
          },
          HttpStatus.CONFLICT,
        );
      });
  }

  async login(user: User): Promise<string> {
    const { id } = user;
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }

  async getUserByToken(token: string): Promise<User> {
    const { id } = await verifyAccessToken(token);
    return this.findOne(id);
  }
}
