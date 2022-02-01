import { Field, InputType } from '@nestjs/graphql';

export enum PaymentStatusEnum {
  PENDIG = 'pending',
  SUCCEEDED = 'succeeded',
  CANCELED = 'CANCELED',
}

@InputType()
export class AddOrderPaymentInput {
  @Field(() => String)
  readonly status: PaymentStatusEnum;
}

export interface OrderPaymentDTO {
  orderPaymentID: string;
  orderNumber: number;
  total: number;
  orderID: string;
}
