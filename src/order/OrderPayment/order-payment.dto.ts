import { Field, InputType } from '@nestjs/graphql';

export enum PaymentStatusEnum {
  PENDIG = 'pending',
  WAITING = 'waiting_for_capture',
  SUCCEEDED = 'succeeded',
  CANCELED = 'CANCELED',
}

@InputType()
export class AddOrderPaymentInput {
  @Field(() => String)
  readonly status: PaymentStatusEnum;
  @Field(() => String)
  readonly confirmation_url: string;
}

export interface OrderPaymentDTO {
  orderPaymentID: string;
  orderNumber: number;
  total: number;
  orderID: string;
}
