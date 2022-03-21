import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AddManagerInput } from './manager.dto';
import { Manager } from './manager.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  find(): Promise<Manager[]> {
    return this.managerRepository.find();
  }

  async create(data: AddManagerInput): Promise<Manager> {
    const { login, password: unencryptedPassword } = data;

    const existedUser = await this.managerRepository.findOne({ login });

    if (existedUser) {
      throw new HttpException('Login already exists', HttpStatus.CONFLICT);
    }

    const password = await bcrypt.hash(
      unencryptedPassword,
      parseFloat(process.env.saltOrRounds),
    );

    return this.managerRepository.save({ login, password });
  }
}
