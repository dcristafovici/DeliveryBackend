import { Injectable } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { OrderPaymentService } from './order-payment.service';

@Injectable()
export class OrderPaymentResolver {
  constructor(private orderPaymentService: OrderPaymentService) {}
  @Query(() => String)
  paymentProcessResolver(@Args('address') address: string): any {
    return lastValueFrom(this.orderPaymentService.processPayment(address))
      .then((response: AxiosResponse<any>) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
}
