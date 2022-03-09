import { Field, InputType } from '@nestjs/graphql';

export enum PaymentStatusEnum {
  AWAITING_PAYMENT = 'awaiting_payment',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DECLINED = 'declined',
}

@InputType()
export class AddOrderPaymentInput {
  @Field(() => String)
  readonly status: PaymentStatusEnum;
  @Field(() => String)
  readonly confirmation_url: string;
}

@InputType()
export class UpdatePaymentStatusDTO {
  @Field(() => String)
  readonly id: string;
  @Field(() => String)
  readonly status: PaymentStatusEnum;
}

export interface OrderPaymentDTO {
  orderPaymentID: string;
  orderNumber: number;
  total: number;
  orderID: string;
}
