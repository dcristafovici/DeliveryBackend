import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderResolver } from './order.resolver';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
