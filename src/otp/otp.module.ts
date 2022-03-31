import { Module } from '@nestjs/common';
import OTPService from './otp.service';
import { OTPResolver } from './otp.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from './otp.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([OTP]), MailModule],
  providers: [OTPService, OTPResolver],
  exports: [OTPService],
})
export class OTPModule {}
