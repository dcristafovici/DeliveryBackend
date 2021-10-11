import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderResolver } from './order.resolver';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), forwardRef(() => ProductModule)],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
