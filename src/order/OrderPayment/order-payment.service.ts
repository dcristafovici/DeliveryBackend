import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { processPaymentConfig } from './order-payment.config';
import {
  AddOrderPaymentInput,
  OrderPaymentDTO,
  PaymentStatusEnum,
} from './order-payment.dto';
import { OrderPayment } from './order-payment.entity';

@Injectable()
export class OrderPaymentService {
  constructor(
    @InjectRepository(OrderPayment)
    private OrderPaymentRepository: Repository<OrderPayment>,
    private httpService: HttpService,
  ) {}

  create(status: AddOrderPaymentInput): Promise<OrderPayment> {
    return this.OrderPaymentRepository.save(status);
  }

  async createProcessPayment(body: OrderPaymentDTO): Promise<any> {
    const { orderPaymentID: id, orderNumber, total, orderID } = body;
    const payload = {
      id: orderNumber,
      status: PaymentStatusEnum.PENDIG,
      paid: true,
      amount: {
        value: total,
        currency: 'RUB',
      },
      payment_method: 'bank_card',
      confirmation: {
        type: 'redirect',
        return_url: `http://localhost:3000/account?successOrdered=${orderID}`,
      },
    };

    const { data } = await firstValueFrom(
      this.httpService.post(
        `${process.env.PAYMENT_API_URL}/payments`,
        payload,
        processPaymentConfig,
      ),
    );

    const { confirmation = {} } = data;
    const { confirmation_url = '' } = confirmation;
    const { affected } = await this.OrderPaymentRepository.update(id, {
      confirmation_url,
    });
    return affected ? true : false;
  }
}
