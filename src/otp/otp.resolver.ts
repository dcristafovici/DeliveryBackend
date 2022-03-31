import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CheckOTPInput, CreateOTPInput } from './otp.dto';
import OTPService from './otp.service';

@Resolver()
export class OTPResolver {
  constructor(private OtpService: OTPService) {}

  @Mutation(() => Boolean)
  createOTP(@Args('data') data: CreateOTPInput): Promise<boolean> {
    return this.OtpService.create(data);
  }

  @Mutation(() => Boolean)
  checkOTP(@Args('data') data: CheckOTPInput): Promise<boolean> {
    return this.OtpService.check(data);
  }
}
