import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/order.entity';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendUserConfirmation(order: Order): Promise<boolean> {
    // console.log(order);
    const response = await this.mailService.sendMail({
      to: 'denbudeyko@yandex.ru',
      subject: 'Welcome to nice App',
      template: 'confirmation',
      context: {
        name: order.orderCustomer.name,
        order: order,
      },
    });

    console.log(response);
    return true;
  }
}
