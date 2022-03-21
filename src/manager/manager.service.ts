import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthManagerInput } from './manager.dto';
import { Manager } from './manager.entity';
import { verifyAccessToken } from 'src/utils/verifyAccessToken';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  find(): Promise<Manager[]> {
    return this.managerRepository.find();
  }

  findOne(id: string): Promise<Manager> {
    return this.managerRepository.findOne(id);
  }

  async login(data: AuthManagerInput): Promise<string> {
    const { login, password } = data;
    const existedManager = await this.managerRepository.findOne({ login });

    if (!existedManager) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Manger does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const { id: managerID, password: managerPassword } =
      await this.managerRepository.findOne({ login });

    const isMatchPassword = await bcrypt.compare(password, managerPassword);
    if (!isMatchPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'INCORRECT_CREDENTIALS',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return jwt.sign({ managerID }, process.env.JWT_SECRET);
  }

  async create(data: AuthManagerInput): Promise<Manager> {
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

  async getManagerByToken(token: string): Promise<Manager> {
    const { managerID: id } = await verifyAccessToken(token);
    return this.findOne(id);
  }
}
