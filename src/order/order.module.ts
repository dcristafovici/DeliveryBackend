import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderCart } from './OrderCart/order-cart.entity';
import { OrderCartService } from './OrderCart/order-cart.service';
import { OrderCustomer } from './OrderCustomer/order-customer.entity';
import { OrderCustomerService } from './OrderCustomer/order-customer.service';
import { OrderPayment } from './OrderPayment/order-payment.entity';
import { OrderPaymentService } from './OrderPayment/order-payment.service';
import { HttpModule } from '@nestjs/axios';
import { OrderNotificationService } from './OrderNotification/order-notification.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    HttpModule,
    MailModule,
    TypeOrmModule.forFeature([Order, OrderCart, OrderCustomer, OrderPayment]),
  ],
  providers: [
    OrderService,
    OrderResolver,
    OrderCartService,
    OrderCustomerService,
    OrderPaymentService,
    OrderNotificationService,
  ],
  exports: [
    OrderService,
    OrderCartService,
    OrderCustomerService,
    OrderPaymentService,
    OrderNotificationService,
  ],
})
export class OrderModule {}
