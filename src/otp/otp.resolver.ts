import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddOtpInput } from './otp.dto';
import OTPService from './otp.service';

@Resolver()
export class OTPResolver {
  constructor(private OtpService: OTPService) {}

  @Mutation(() => Boolean)
  createOTP(@Args('data') data: AddOtpInput): Promise<boolean> {
    return this.OtpService.create(data);
  }
}
