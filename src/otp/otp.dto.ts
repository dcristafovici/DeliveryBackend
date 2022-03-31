import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum OTPEnumType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}
registerEnumType(OTPEnumType, {
  name: 'OTPEnumType',
});

@InputType()
@ObjectType()
export class CreateOTPInput {
  @Field(() => String)
  readonly value: string;

  @Field(() => String)
  readonly sessionID: string;

  @Field(() => OTPEnumType)
  readonly typeOfOTP: OTPEnumType;
}

@InputType()
@ObjectType()
export class CheckOTPInput {
  @Field(() => String)
  readonly code: string;

  @Field(() => String)
  readonly sessionID: string;
}
