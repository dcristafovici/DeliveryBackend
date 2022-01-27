import { Injectable } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { PaymentService } from './payment.service';

@Injectable()
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}
  @Query(() => String)
  paymentProcessResolver(@Args('address') address: string): any {
    return lastValueFrom(this.paymentService.processPayment(address))
      .then((response: AxiosResponse<any>) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
}
