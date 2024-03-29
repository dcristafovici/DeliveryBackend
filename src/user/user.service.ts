import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { GraphQLGeneralRequest } from 'src/constants/GraphqlGeneralTypes';
import { ListResult } from 'src/constants/TypeormGeneralTypes';
import OTPService from 'src/otp/otp.service';
import { getListAndCount } from 'src/utils/getListAndCount';
import { verifyAccessToken } from 'src/utils/verifyAccessToken';
import { Repository } from 'typeorm';
import { AuthenticationInput, UpdateUserInput } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private otpService: OTPService,
  ) {}

  async find(data: GraphQLGeneralRequest): Promise<ListResult<User>> {
    const { page = 1, pageSize } = data;
    const query = this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.created_at', 'DESC');
    const [list, count] = await getListAndCount(query, page, pageSize);
    return { list, page, pageSize, count };
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findByField(key: string, value: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where(`user.${key} = ${key}`, { value })
      .getOne();
  }

  async update(id: string, data: UpdateUserInput): Promise<boolean> {
    const { affected } = await this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set({ ...data })
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }

  async register(userPhone: string): Promise<string> {
    return this.userRepository
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

  async authentication(data: AuthenticationInput): Promise<string> {
    const { phone, code, sessionID } = data;
    const isMatchCodes = await this.otpService.check({ code, sessionID });
    if (!isMatchCodes) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'INCORRECT_CREDENTIALS',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const existedUser = await this.findByField('phone', phone);
    return existedUser ? this.login(existedUser) : this.register(phone);
  }
}
