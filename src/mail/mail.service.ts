import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendUserConfirmation(): Promise<boolean> {
    const ds = await this.mailService.sendMail({
      to: 'denbudeyko@yandex.ru',
      subject: 'Welcome to nice App',
      template: 'confirmation',
      context: {
        name: 'Dan',
        url: 'https://google.com',
      },
    });

    console.log(ds);
    return true;
  }
}
