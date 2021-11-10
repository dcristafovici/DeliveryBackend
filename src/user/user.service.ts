import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AddUserInput, UpdateUserInput } from './user.dto';
import jwt from 'jsonwebtoken';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async create(data: AddUserInput): Promise<any> {
    const { phone } = data;
    const user = await this.UserRepository.findOne({ phone });
    let newUser;
    if (!user) {
      newUser = await this.UserRepository.save(data);
    }
    const token = jwt.sign(
      { id: user ? user.id : newUser.id },
      process.env.JWT_SECRET,
    );
    return { ...user, token };
  }

  async checkToken(token: string): Promise<User> {
    const verified: any = jwt.verify(token, process.env.JWT_SECRET);
    const User = await this.UserRepository.findOne(verified.id);
    Object.keys(User).forEach((key) => {
      if (User[key] === null) {
        User[key] = '';
      }
    });
    return User;
  }

  async updateUser(data: UpdateUserInput): Promise<any> {
    const { id, field, value } = data;
    const user = new User();
    user[field] = value;
    await validate(user).then((errors) => {
      if (errors.length > 0) {
        console.log(errors);
        const { constraints } = errors[0];
        const field = Object.keys(constraints)[0];
        throw new HttpException(constraints[field], HttpStatus.BAD_REQUEST);
      }
    });

    return this.UserRepository.update(id, { [field]: value });
  }

  findAll(): Promise<User[]> {
    return this.UserRepository.find();
  }
}
