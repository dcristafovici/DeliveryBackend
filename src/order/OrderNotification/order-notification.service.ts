import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Order } from '../order.entity';

@Injectable()
export class OrderNotificationService {
  async sendNotification(data: Order): Promise<any> {
    const { orderNumber, date, orderCart, orderCustomer, total } = data;
    const { name, phone, email, address } = orderCustomer;
    const convertedTimeWithTimezone = new Date(date).toLocaleString('en-GB', {
      timeZone: 'Europe/Moscow',
    });

    const orderMessage = `
      <b>Поступил новый заказ №${orderNumber}</b>
      <b>Имя </b><i>${name}</i>
      <b>Адрес </b><i>${address}</i>
      <b>Время доставки: </b><i>${convertedTimeWithTimezone.toString()}</i> 
      <b>Номер телефона </b><i>${phone}</i>
      <b>Email </b><i>${email}</i>
      <b>Итого </b><i>${total}</i>
      <b>Продукты</b>${orderCart.map(
        (cart) => `
          <b>${cart.product.name}</b> - <i>${cart.quantity} шт.</i>`,
      )}
    `;
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT, orderMessage, {
      parse_mode: 'HTML',
    });
  }
}
