import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { processPaymentConfig } from './order-payment.config';
import { PaymentStatusEnum } from './order-payment.dto';

@Injectable()
export class OrderPaymentService {
  constructor(private httpService: HttpService) {}
  processPayment(address: string): Observable<AxiosResponse<any>> {
    const payload = {
      id: '4',
      status: PaymentStatusEnum.PENDIG,
      paid: true,
      amount: {
        value: '2500.00',
        currency: 'RUB',
      },
      payment_method: 'bank_card',
      confirmation: {
        type: 'redirect',
        return_url: 'https://google.com/',
      },
      items: [
        {
          description: 'Capybara',
          quantity: 1.0,
          amount: {
            value: '2500.00',
            currency: 'RUB',
          },
          vat_code: 2,
          payment_mode: 'full_payment',
          payment_subject: 'commodity',
        },
      ],
    };

    return this.httpService
      .post(
        `${process.env.PAYMENT_API_URL}/payments`,
        payload,
        processPaymentConfig,
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return axiosResponse.data;
        }),
      );
  }
}
