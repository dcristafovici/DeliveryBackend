import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(private httpService: HttpService) {}
  processPayment(address: string): Observable<AxiosResponse<any>> {
    const processPaymentConfig: AxiosRequestConfig = {
      auth: {
        username: process.env.PAYMENT_SHOP_ID,
        password: process.env.PAYMENT_SECRET_KEY,
      },
      headers: {
        'Idempotence-Key': '03347fc4-a1f0-49db-807e-f0d67c2ed5a5',
      },
    };
    const payload = {
      id: '22e12f66-000f-5000-8000-18db351235c7',
      status: 'waiting_for_capture',
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
