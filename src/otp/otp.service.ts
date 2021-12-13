import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AddOtpInput } from './otp.dto';
import { OTP } from './otp.entity';
import axios from 'axios';

@Injectable()
export default class OTPService {
  constructor(
    @InjectRepository(OTP)
    private OTPRepository: Repository<OTP>,
  ) {}

  find(sessionID: string): Promise<OTP> {
    return this.OTPRepository.findOne({ sessionID });
  }

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
}
