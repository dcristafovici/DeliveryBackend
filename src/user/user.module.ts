import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { OTPModule } from 'src/otp/otp.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), OTPModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
