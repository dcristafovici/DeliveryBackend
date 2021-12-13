import { Module } from '@nestjs/common';
import OTPService from './otp.service';
import { OTPResolver } from './otp.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from './otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OTP])],
  providers: [OTPService, OTPResolver],
  exports: [OTPService],
})
export class OTPModule {}
