import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/order.entity';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendUserConfirmation(order: Order): Promise<boolean> {
    const { date, orderNumber, total } = order;
    const { restaurant, orderCart, orderCustomer } = order;

    const { name, email, phone, address } = orderCustomer;
    await this.mailService.sendMail({
      to: email,
      subject: 'Your order has been created',
      template: 'confirmation',
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
}
