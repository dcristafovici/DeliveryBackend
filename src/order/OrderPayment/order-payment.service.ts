import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { processPaymentConfig } from './order-payment.config';
import { OrderPayment } from './order-payment.entity';
import {
  AddOrderPaymentInput,
  OrderPaymentDTO,
  PaymentStatusEnum,
  UpdatePaymentStatusDTO,
} from './order-payment.dto';

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
      status: PaymentStatusEnum.AWAITING_PAYMENT,
      paid: true,
      amount: {
        value: total,
        currency: 'RUB',
      },
      payment_method: 'bank_card',
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.DOMAIN}/account?successOrdered=${orderID}`,
      },
    };

    const { data } = await firstValueFrom(
      this.httpService.post(
        `${process.env.PAYMENT_API_URL}/payments`,
        payload,
        processPaymentConfig(id),
      ),
    );

    const { confirmation = {} } = data;
    const { confirmation_url = '' } = confirmation;
    const { affected } = await this.OrderPaymentRepository.update(id, {
      confirmation_url,
    });
    return affected ? true : false;
  }

  async updateStatus(data: UpdatePaymentStatusDTO): Promise<UpdateResult> {
    const { id, status } = data;
    return this.OrderPaymentRepository.update(id, { status: status });
  }
}
