import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProductModule } from 'src/product/product.module';
import { OTPModule } from 'src/otp/otp.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProductModule, OTPModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
