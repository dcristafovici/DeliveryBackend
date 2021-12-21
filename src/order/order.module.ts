import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderCart } from './order-cart.entity';
import { OrderCustomer } from './order-customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderCart, OrderCustomer])],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
