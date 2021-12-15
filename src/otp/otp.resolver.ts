import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CheckOtpInput } from 'src/otp/otp.dto';
import { AddOtpInput } from './otp.dto';
import OTPService from './otp.service';

@Resolver()
export class OTPResolver {
  constructor(private OtpService: OTPService) {}

  @Mutation(() => Boolean)
  createOTP(@Args('data') data: AddOtpInput): Promise<boolean> {
    return this.OtpService.create(data);
  }

  @Mutation(() => String)
  authenticationUser(@Args('data') data: CheckOtpInput): Promise<string> {
    return this.OtpService.authentication(data);
  }
}
