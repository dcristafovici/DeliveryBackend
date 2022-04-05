import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OTP } from './otp.entity';
import { CheckOTPInput, CreateOTPInput, OTPEnumType } from './otp.dto';
import { compareCodes, randomHashedOTP } from 'src/utils/randomHashedOTP';
import { MailService } from 'src/mail/mail.service';
import axios from 'axios';

@Injectable()
export default class OTPService {
  constructor(
    @InjectRepository(OTP)
    private OTPRepository: Repository<OTP>,
    private mailService: MailService,
  ) {}

  save(data: CheckOTPInput): Promise<OTP> {
    const { code, sessionID } = data;
    return this.OTPRepository.save({ code, sessionID });
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.OTPRepository.createQueryBuilder('OTP')
      .delete()
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }

  async create(data: CreateOTPInput): Promise<boolean> {
    const { value, sessionID, typeOfOTP } = data;
    const { code, hashedOTP } = await randomHashedOTP();

    if (typeOfOTP === OTPEnumType.EMAIL) {
      await this.mailService
        .sendUserConfirmation({ code, email: value })
        .catch(() => false);
    }

    if (typeOfOTP === OTPEnumType.PHONE) {
      await axios
        .get(
          `${process.env.SMS_URL}${value}&code=${code}&${process.env.SMS_API_ID}`,
        )
        .catch(() => false);
    }

    await this.save({ code: hashedOTP, sessionID }).catch(() => false);

    return true;
  }

  async check(data: CheckOTPInput): Promise<boolean> {
    const { code, sessionID } = data;
    const OTPEntity = await this.OTPRepository.findOne({ sessionID });

    if (!OTPEntity) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'SESSION_ID_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const { code: hashedCode } = OTPEntity;

    return compareCodes(code, hashedCode);
  }
}
