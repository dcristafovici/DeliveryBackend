import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartResolver } from './cart.resolver';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartResolver, CartService],
  exports: [CartService],
})
export class CartModule {}
