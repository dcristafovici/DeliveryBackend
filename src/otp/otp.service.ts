import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AddOtpInput } from './otp.dto';
import { OTP } from './otp.entity';
import axios from 'axios';
import { CheckOtpInput } from 'src/otp/otp.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export default class OTPService {
  constructor(
    @InjectRepository(OTP)
    private OTPRepository: Repository<OTP>,
    private userService: UserService,
  ) {}

  async create(data: AddOtpInput): Promise<boolean> {
    const { sessionID, phone } = data;

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(
      OTP,
      parseFloat(process.env.saltOrRounds),
    );

    return await axios
      .get(`${process.env.SMS_URL}&to=${phone}&msg=${OTP}&json=1`)
      .then(async () => {
        await this.OTPRepository.save({ OTP: hashedOTP, sessionID });
        return true;
      })
      .catch(() => false);
  }

  async authentication(data: CheckOtpInput): Promise<string> {
    const { phone, sessionID, OTP } = data;
    const OtpEntity = await this.OTPRepository.findOne({ sessionID });
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

    const existedUser = await this.userService.findByField('phone', phone);
    const token = existedUser
      ? await this.userService.login(existedUser)
      : await this.userService.register(phone);

    return token;
  }
}
