import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import OTPService from 'src/otp/otp.service';
import { Repository } from 'typeorm';
import { CheckOtpInput } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private otpService: OTPService,
  ) {}

  async authentication(data: CheckOtpInput): Promise<string> {
    const { phone, sessionID, OTP } = data;
    const OtpEntity = await this.otpService.find(sessionID);
    // Not finded Session
    if (!OtpEntity) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'SESSION_ID_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const { OTP: hashedOTP } = OtpEntity;
    const isMatchOTP = await bcrypt.compare(OTP, hashedOTP);
    // Passwords are not matched
    if (!isMatchOTP) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'INCORRECT_CREDENTIALS',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const existedUser = await this.userRepository.findOne({ phone });
    const token = existedUser
      ? await this.login(existedUser)
      : await this.register(phone);

    return token;
  }

  async register(userPhone: string): Promise<string> {
    return await this.userRepository
      .save({ phone: userPhone })
      .then((res) => {
        const { id, phone } = res;
        return jwt.sign({ id, phone }, process.env.JWT_SECRET);
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
    const { phone, id } = user;
    return jwt.sign({ id, phone }, process.env.JWT_SECRET);
  }
}
