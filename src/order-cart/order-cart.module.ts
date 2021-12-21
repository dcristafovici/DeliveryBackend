import { Module } from '@nestjs/common';
import { OrderCartService } from './order-cart.service';
import { OrderCartResolver } from './order-cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCart } from './order-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderCart])],
  providers: [OrderCartService, OrderCartResolver],
  exports: [OrderCartService],
})
export class OrderCartModule {}
