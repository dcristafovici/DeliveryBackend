import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByKeyInput } from 'src/category/category.dto';
import {
  getGeneralResponse,
  GraphqlRequestParams,
} from 'src/constants/GraphqlGeneralTypes';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { AddOrderInput, GraphqlGettingOrders } from './order.dto';
import { Order } from './order.entity';
import { OrderCartService } from './OrderCart/order-cart.service';
import { OrderCustomerService } from './OrderCustomer/order-customer.service';
import { OrderNotificationService } from './OrderNotification/order-notification.service';
import { PaymentStatusEnum } from './OrderPayment/order-payment.dto';
import { OrderPaymentService } from './OrderPayment/order-payment.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderCustomerService: OrderCustomerService,
    private orderCartService: OrderCartService,
    private orderPaymentService: OrderPaymentService,
    private orderNotificationService: OrderNotificationService,

    private mailService: MailService,
  ) {}

  async find(data: GraphqlRequestParams): Promise<GraphqlGettingOrders> {
    const { offset, limit } = data;
    const items = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.restaurant', 'restaurant')
      .leftJoinAndSelect('order.user', 'media')
      .leftJoinAndSelect('order.orderCustomer', 'orderCustomer')
      .innerJoinAndSelect('order.orderCart', 'orderCart')
      .leftJoinAndSelect('orderCart.product', 'product')
      .leftJoinAndSelect('product.media', 'product_media')
      .leftJoinAndSelect('order.orderPayment', 'orderPayment')
      .offset(offset)
      .limit(limit)
      .getMany();

    const totalItems = await this.orderRepository.count();
    return getGeneralResponse(items, totalItems);
  }

  findOne(id: string): Promise<Order> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.restaurant', 'restaurant')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderCustomer', 'orderCustomer')
      .leftJoinAndSelect('order.orderPayment', 'orderPayment')
      .where('order.id = :id', { id })
      .getOne();
  }

  findByKey(data: FindByKeyInput): Promise<Order[]> {
    const { field, value } = data;
    return this.orderRepository.find({ where: { [field]: value } });
  }

  async create(data: AddOrderInput): Promise<Order> {
    const { orderCart, orderCustomer, ...order } = data;

    const orderCustomerCreated = await this.orderCustomerService.create(
      orderCustomer,
    );
    const orderCartCreated = await this.orderCartService.create(orderCart);
    const orderPaymentCreate = await this.orderPaymentService.create({
      status: PaymentStatusEnum.AWAITING_PAYMENT,
      confirmation_url: 'Placeholder',
    });

    const combinedOrder = {
      ...order,
      orderCustomer: orderCustomerCreated,
      orderCart: orderCartCreated,
      orderPayment: orderPaymentCreate,
    };

    const createdOrder = await this.orderRepository.save(combinedOrder);
    const { id, orderNumber, total, orderPayment } = createdOrder;
    await this.orderPaymentService.createProcessPayment({
      orderPaymentID: orderPayment.id,
      orderNumber,
      total,
      orderID: id,
    });

    const updatedCombinedOrder = await this.orderRepository.findOne(id);

    this.orderNotificationService.sendNotification(updatedCombinedOrder);

    this.mailService.sendUserOrder(updatedCombinedOrder);

    return updatedCombinedOrder;
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.orderRepository
      .createQueryBuilder('order')
      .delete()
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }
}
