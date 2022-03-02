import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { AddOrderInput } from '../order.dto';

@Injectable()
export class OrderNotificationService {
  async sendNotification(data: AddOrderInput): Promise<any> {
    const { date, orderCart, orderCustomer, total } = data;
    const { name, phone, email, address } = orderCustomer;
    const dateToUTC = new Date(date);

    const orderMessage = `
      <b>Поступил новый заказ</b>
      <b>Имя </b><i>${name}</i>
      <b>Адрес </b><i>${address}</i>
      <b>Дата </b><i>${dateToUTC.toString()}</i> 
      <b>Номер телефона </b><i>${phone}</i>
      <b>Email </b><i>${email}</i>
      <b>Итого </b><i>${total}</i>
      <b>Продукты</b>${orderCart.map(
        (cart) => `
          <b>${cart.productName}</b> - <i>${cart.quantity} шт.</i>`,
      )}
    `;
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT, orderMessage, {
      parse_mode: 'HTML',
    });
  }
}
