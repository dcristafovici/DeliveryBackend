import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/order.entity';
import { MailConfirmationDTO } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendUserOrder(order: Order): Promise<boolean> {
    const { date, orderNumber, total } = order;
    const { restaurant, orderCart, orderCustomer } = order;

    const { name, email, phone, address } = orderCustomer;
    await this.mailService.sendMail({
      to: email,
      subject: 'Your order has been created',
      template: 'order',
      context: {
        date,
        orderNumber,
        total,
        restaurant,
        orderCart,
        name,
        email,
        phone,
        address,
      },
    });
    return true;
  }

  async sendUserConfirmation(data: MailConfirmationDTO): Promise<boolean> {
    const { code, email } = data;
    await this.mailService.sendMail({
      to: email,
      subject: 'Please confirm your email',
      template: 'confirmation',
      context: {
        code,
      },
    });
    return true;
  }
}
